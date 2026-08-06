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

async function deleteTicket(id) {

    await sql.connect(config);

    await sql.query`

        DELETE FROM Ticket

        WHERE TicketID = ${id}

    `;
}

module.exports = {
    getTickets,
    addTicket,
    updateTicket,
    deleteTicket
};