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

    // Kiểm tra format ghế: A01, A02, B05...
    const match = seat.match(/^[A-Z](\d{2})$/);

    if (!match) {
        throw new Error(
            "Số ghế không hợp lệ. Ví dụ hợp lệ: A01, A02, B05."
        );
    }

    const seatNumberPart = Number(match[1]);

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

async function addTicket(
    scheduleID,
    passengerName,
    seatNumber,
    price,
    status
) {

    await sql.connect(config);

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

    // Booked → Cancelled
    if (
        currentStatus === "Booked" &&
        newStatus === "Cancelled"
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
    checkTicketStatusChange
};