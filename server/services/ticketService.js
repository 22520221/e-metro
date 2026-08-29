const { sql, config } = require("../config/db");

async function getTickets() {

    await sql.connect(config);

    const result = await sql.query`

        SELECT
            tk.*,
            tr.TrainName,
            st.StationName,
            sc.ArrivalTime,
            sc.DepartureTime

        FROM Ticket tk

        LEFT JOIN Schedule sc
            ON tk.ScheduleID = sc.ScheduleID

        LEFT JOIN Train tr
            ON sc.TrainID = tr.TrainID

        LEFT JOIN Station st
            ON sc.StationID = st.StationID

        ORDER BY tk.TicketID

    `;

    return result.recordset;
}

    function getSeatIndex(seat) {

    const match = seat.match(/^([ABC])(\d{2})$/);

    if (!match) {
        throw new Error(
            "Số ghế không hợp lệ. Ghế phải có dạng A01 - C12."
        );
    }

    const row = match[1];
    const number = Number(match[2]);

    if (number < 1 || number > 12) {
        throw new Error(
            "Số ghế trong mỗi dãy phải từ 01 đến 12."
        );
    }

    if (row === "A") {
        return number;
    }

    if (row === "B") {
        return 12 + number;
    }

    if (row === "C") {
        return 24 + number;
    }
}

    async function checkSeatAvailable(
    scheduleID,
    seatNumber,
    excludeTicketID = null
) {

    await sql.connect(config);

    if (excludeTicketID !== null) {
        excludeTicketID = Number(excludeTicketID);
    }

    // 1. Lấy Capacity của tàu
    const scheduleResult = await sql.query`

        SELECT
            tr.Capacity

        FROM Schedule sc

        INNER JOIN Train tr
            ON sc.TrainID = tr.TrainID

        WHERE sc.ScheduleID = ${scheduleID}

    `;

    if (scheduleResult.recordset.length === 0) {

        throw new Error(
            "Lịch chạy không tồn tại."
        );

    }

    const capacity =
        scheduleResult.recordset[0].Capacity;


    // 2. Kiểm tra số ghế hợp lệ
    const seat = String(seatNumber)
        .trim()
        .toUpperCase();

    const seatIndex = getSeatIndex(seat);

    // Kiểm tra ghế không vượt quá Capacity
    if (seatIndex > capacity) {
        throw new Error(
            `Số ghế không hợp lệ. Tàu chỉ có ${capacity} ghế.`
        );
    }


    // 3. Kiểm tra ghế đã được đặt chưa
    let result;

    if (excludeTicketID === null) {

        result = await sql.query`

            SELECT TicketID

            FROM Ticket

            WHERE ScheduleID = ${scheduleID}

            AND SeatNumber = ${seat}

            AND Status <> 'Cancelled'

        `;

    } else {

        result = await sql.query`

            SELECT TicketID

            FROM Ticket

            WHERE ScheduleID = ${scheduleID}

            AND SeatNumber = ${seat}

            AND TicketID <> ${excludeTicketID}

            AND Status <> 'Cancelled'

        `;

    }


    return result.recordset.length > 0;

}

async function checkCapacity(
    scheduleID,
    excludeTicketID = null
) {

    await sql.connect(config);

    const scheduleResult = await sql.query`
        SELECT
            tr.Capacity
        FROM Schedule sc
        INNER JOIN Train tr
            ON sc.TrainID = tr.TrainID
        WHERE sc.ScheduleID = ${scheduleID}
    `;

    if (scheduleResult.recordset.length === 0) {
        throw new Error(
            "Lịch chạy không tồn tại."
        );
    }

    const capacity =
        Number(scheduleResult.recordset[0].Capacity);

    let ticketResult;

    if (excludeTicketID === null) {

        ticketResult = await sql.query`
            SELECT COUNT(*) AS BookedCount
            FROM Ticket
            WHERE ScheduleID = ${scheduleID}
            AND Status IN ('Booked', 'Paid', 'Used')
        `;

    } else {

        ticketResult = await sql.query`
            SELECT COUNT(*) AS BookedCount
            FROM Ticket
            WHERE ScheduleID = ${scheduleID}
            AND TicketID <> ${Number(excludeTicketID)}
            AND Status IN ('Booked', 'Paid', 'Used')
        `;

    }

    const bookedCount =
        Number(ticketResult.recordset[0].BookedCount);

    if (bookedCount >= capacity) {

        throw new Error(
            "Tàu đã hết chỗ."
        );

    }

    return {
        capacity,
        bookedCount,
        availableCount: capacity - bookedCount
    };
}

async function checkScheduleCanBook(scheduleID) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT DepartureTime
        FROM Schedule
        WHERE ScheduleID = ${scheduleID}
    `;

    if (result.recordset.length === 0) {
        throw new Error("Lịch chạy không tồn tại.");
    }

    const departureTime =
        new Date(result.recordset[0].DepartureTime);

    const now = new Date();

    if (departureTime <= now) {
        throw new Error(
            "Không thể đặt vé cho chuyến đã khởi hành."
        );
    }

    return true;
}

async function getTicketsByRunID(runID) {

    await sql.connect(config);

    // Kiểm tra chuyến có tồn tại
    const runCheck = await sql.query`
        SELECT TOP 1 RunID
        FROM Schedule
        WHERE RunID = ${runID}
    `;

    if (runCheck.recordset.length === 0) {
        throw new Error("Chuyến không tồn tại.");
    }

    // Lấy danh sách vé
    const result = await sql.query`
        SELECT
            tk.TicketID,
            tk.ScheduleID,
            tk.PassengerName,
            tk.SeatNumber,
            tk.Price,
            tk.Status,
            tk.CreatedAt,
            sc.RunID,
            sc.TrainID,
            t.TrainName
        FROM Ticket tk
        INNER JOIN Schedule sc
            ON tk.ScheduleID = sc.ScheduleID
        INNER JOIN Train t
            ON sc.TrainID = t.TrainID
        WHERE sc.RunID = ${runID}
        ORDER BY tk.TicketID
    `;

    return result.recordset;
}

async function getSeatsByRunID(runID) {

    await sql.connect(config);

    const runCheck = await sql.query`
        SELECT TOP 1 RunID
        FROM Schedule
        WHERE RunID = ${runID}
    `;

    if (runCheck.recordset.length === 0) {
        throw new Error("Chuyến không tồn tại.");
    }

    const result = await sql.query`
        SELECT
            s.RunID,
            t.TrainID,
            t.TrainName,
            t.Capacity,
            tk.SeatNumber,
            tk.Status,
            tk.PassengerName

        FROM Schedule s

        INNER JOIN Train t
            ON s.TrainID = t.TrainID

        LEFT JOIN Ticket tk
            ON s.ScheduleID = tk.ScheduleID
            AND tk.Status <> 'Cancelled'

        WHERE s.RunID = ${runID}

        ORDER BY tk.SeatNumber
    `;

    const first = result.recordset[0];

    const bookedSeats = result.recordset
    .filter(row => row.SeatNumber !== null)
    .map(row => ({
        seatNumber: row.SeatNumber,
        status: row.Status,
        passengerName: row.PassengerName
    }));

return {
    runID: first.RunID,
    trainID: first.TrainID,
    trainName: first.TrainName,
    capacity: first.Capacity,
    bookedCount: bookedSeats.length,
    availableCount: first.Capacity - bookedSeats.length,
    bookedSeats
};
}

async function getTicketsByScheduleID(scheduleID) {

    await sql.connect(config);

    const scheduleCheck = await sql.query`
        SELECT ScheduleID
        FROM Schedule
        WHERE ScheduleID = ${scheduleID}
    `;

    if (scheduleCheck.recordset.length === 0) {
        throw new Error("Lịch chạy không tồn tại.");
    }

    const result = await sql.query`
        SELECT
            tk.TicketID,
            tk.ScheduleID,
            tk.PassengerName,
            tk.SeatNumber,
            tk.Price,
            tk.Status,
            tk.CreatedAt
        FROM Ticket tk
        WHERE tk.ScheduleID = ${scheduleID}
        ORDER BY tk.TicketID
    `;

    return result.recordset;
}

async function getTicketStatisticsByRunID(runID) {
    await sql.connect(config);

    const runCheck = await sql.query`
        SELECT DISTINCT
            RunID,
            TrainID
        FROM Schedule
        WHERE RunID = ${runID}
    `;

    if (runCheck.recordset.length === 0) {
        throw new Error("Chuyến không tồn tại.");
    }

    const result = await sql.query`
        SELECT
            s.RunID,
            t.Capacity,

            COUNT(tk.TicketID) AS TotalTickets,

            SUM(CASE
                WHEN tk.Status = 'Booked' THEN 1
                ELSE 0
            END) AS Booked,

            SUM(CASE
                WHEN tk.Status = 'Used' THEN 1
                ELSE 0
            END) AS Used,

            SUM(CASE
                WHEN tk.Status = 'Cancelled' THEN 1
                ELSE 0
            END) AS Cancelled,

            SUM(CASE
                WHEN tk.Status IN ('Booked', 'Used') THEN 1
                ELSE 0
            END) AS ActiveTickets

        FROM Schedule s

        INNER JOIN Train t
            ON s.TrainID = t.TrainID

        LEFT JOIN Ticket tk
            ON s.ScheduleID = tk.ScheduleID

        WHERE s.RunID = ${runID}

        GROUP BY
            s.RunID,
            t.Capacity;
    `;

    const row = result.recordset[0];

    return {
        runID: row.RunID,
        capacity: row.Capacity,
        totalTickets: row.TotalTickets,
        booked: row.Booked,
        used: row.Used,
        cancelled: row.Cancelled,
        activeTickets: row.ActiveTickets,
        availableSeats: row.Capacity - row.ActiveTickets
    };
}

async function getTicketStatisticsByScheduleID(scheduleID) {

    await sql.connect(config);

    const scheduleCheck = await sql.query`
        SELECT ScheduleID
        FROM Schedule
        WHERE ScheduleID = ${scheduleID}
    `;

    if (scheduleCheck.recordset.length === 0) {
        throw new Error("Lịch chạy không tồn tại.");
    }

    const result = await sql.query`
        SELECT
            sc.ScheduleID,
            sc.RunID,
            t.TrainID,
            t.TrainName,
            t.Capacity,

            COUNT(tk.TicketID) AS TotalTickets,

            SUM(CASE
                WHEN tk.Status = 'Booked' THEN 1
                ELSE 0
            END) AS Booked,

            SUM(CASE
                WHEN tk.Status = 'Used' THEN 1
                ELSE 0
            END) AS Used,

            SUM(CASE
                WHEN tk.Status = 'Cancelled' THEN 1
                ELSE 0
            END) AS Cancelled,

            SUM(CASE
                WHEN tk.Status IN ('Booked', 'Used') THEN 1
                ELSE 0
            END) AS ActiveTickets

        FROM Schedule sc

        INNER JOIN Train t
            ON sc.TrainID = t.TrainID

        LEFT JOIN Ticket tk
            ON sc.ScheduleID = tk.ScheduleID

        WHERE sc.ScheduleID = ${scheduleID}

        GROUP BY
            sc.ScheduleID,
            sc.RunID,
            t.TrainID,
            t.TrainName,
            t.Capacity;
    `;

    const row = result.recordset[0];

    return {
        scheduleID: row.ScheduleID,
        runID: row.RunID,
        trainID: row.TrainID,
        trainName: row.TrainName,
        capacity: row.Capacity,
        totalTickets: row.TotalTickets,
        booked: row.Booked,
        used: row.Used,
        cancelled: row.Cancelled,
        activeTickets: row.ActiveTickets,
        availableSeats: row.Capacity - row.ActiveTickets
    };
}

async function searchTicketsByPassengerName(passengerName) {
    await sql.connect(config);

    const result = await sql.query`
        SELECT
            TicketID,
            ScheduleID,
            PassengerName,
            SeatNumber,
            Price,
            Status,
            CreatedAt
        FROM Ticket
        WHERE PassengerName LIKE ${'%' + passengerName + '%'}
        ORDER BY TicketID;
    `;

    return result.recordset;
}

async function getTicketsByStatus(status) {
    await sql.connect(config);

    const result = await sql.query`
        SELECT
            TicketID,
            ScheduleID,
            PassengerName,
            SeatNumber,
            Price,
            Status,
            CreatedAt
        FROM Ticket
        WHERE Status = ${status}    
        ORDER BY TicketID;
    `;

    return result.recordset;
}

async function addTicket(
    scheduleID,
    passengerName,
    seatNumber,
    price,
    status
) {

    await sql.connect(config);

    await checkScheduleCanBook(scheduleID);

    await sql.query`

        INSERT INTO Ticket
        (
            ScheduleID,
            PassengerName,
            SeatNumber,
            Price,
            Status
        )

        VALUES
        (
            ${scheduleID},
            ${passengerName},
            ${seatNumber},
            ${price},
            ${status}
        )

    `;
}

    async function checkTicketStatusChange(id, newStatus) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT Status
        FROM Ticket
        WHERE TicketID = ${id}
    `;

    if (result.recordset.length === 0) {
        throw new Error("Vé không tồn tại.");
    }

    const currentStatus = result.recordset[0].Status;

    // Không thay đổi trạng thái
    if (currentStatus === newStatus) {
        return true;
    }

    // Booked → Used
    if (
        currentStatus === "Booked" &&
        newStatus === "Used"
    ) {
        return true;
    }

    // Paid → Used
    if (
        currentStatus === "Paid" &&
        newStatus === "Used"
    ) {
        return true;
    }
        
    // Các trường hợp còn lại không cho phép
    throw new Error(
        `Không thể chuyển trạng thái từ ${currentStatus} sang ${newStatus}.`
    );
}

async function updateTicket(
    id,
    scheduleID,
    passengerName,
    seatNumber,
    price,
    status
) {

    await sql.connect(config);

    const ticketResult = await sql.query`
        SELECT Status
        FROM Ticket
        WHERE TicketID = ${id}
    `;

    if (ticketResult.recordset.length === 0) {
        throw new Error("Vé không tồn tại.");
    }

    const currentStatus =
        ticketResult.recordset[0].Status;

    // Kiểm tra chuyển trạng thái
    await checkTicketStatusChange(
        id,
        status
    );

    // Used / Cancelled không được chỉnh sửa
    if (
        currentStatus === "Used" ||
        currentStatus === "Cancelled"
    ) {
        throw new Error(
            `Không thể sửa vé có trạng thái ${currentStatus}.`
        );
    }

    // Kiểm tra sức chứa của Schedule mới
    // Loại trừ chính Ticket đang được sửa
    await checkCapacity(
        scheduleID,
        id
    );

    await sql.query`

        UPDATE Ticket

        SET
            ScheduleID = ${scheduleID},
            PassengerName = ${passengerName},
            SeatNumber = ${seatNumber},
            Price = ${price},
            Status = ${status}

        WHERE TicketID = ${id}

    `;
}

async function cancelTicket(id) {

    await sql.connect(config);

    const ticketResult = await sql.query`
        SELECT Status
        FROM Ticket
        WHERE TicketID = ${id}
    `;

    if (ticketResult.recordset.length === 0) {
        throw new Error("Vé không tồn tại.");
    }

    const currentStatus = ticketResult.recordset[0].Status;

    if (currentStatus === "Cancelled") {
        throw new Error("Vé này đã được hủy.");
    }

    if (currentStatus === "Used") {
        throw new Error(
            "Không thể hủy vé đã được sử dụng."
        );
    }

    await sql.query`
        UPDATE Ticket
        SET Status = 'Cancelled'
        WHERE TicketID = ${id}
    `;
}

module.exports = {
    getTickets,
    addTicket,
    updateTicket,
    cancelTicket,
    checkSeatAvailable,
    checkTicketStatusChange,
    checkCapacity,
    checkScheduleCanBook,
    getTicketsByRunID,
    getSeatsByRunID,
    getTicketsByScheduleID,
    getTicketStatisticsByRunID,
    getTicketStatisticsByScheduleID,
    searchTicketsByPassengerName,
    getTicketsByStatus
};