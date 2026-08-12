const { sql, config } = require("../config/db");

async function getSchedules() {
    await sql.connect(config);

    const result = await sql.query`
    SELECT
        s.*,
        t.TrainName,
        st.StationName
    FROM Schedule s
    LEFT JOIN Train t
        ON s.TrainID = t.TrainID
    LEFT JOIN Station st
        ON s.StationID = st.StationID
    ORDER BY s.ScheduleID
`;

    return result.recordset;
}

async function addSchedule(trainID, stationID, arrivalTime, departureTime, stopOrder) {

    await sql.connect(config);

    console.log(trainID);
    console.log(stationID);
    console.log(arrivalTime);
    console.log(departureTime);
    console.log(stopOrder);

    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);

    console.log(arrival);
    console.log(departure);

    await sql.query`
        INSERT INTO Schedule
        (
            TrainID,
            StationID,
            ArrivalTime,
            DepartureTime,
            StopOrder
        )
        VALUES
        (
            ${trainID},
            ${stationID},
            ${arrival},
            ${departure},
            ${Number(stopOrder)}
        )
    `;
}

async function updateSchedule(id, trainID, stationID, arrivalTime, departureTime, stopOrder) {
    await sql.connect(config);

    await sql.query`
        UPDATE Schedule
        SET
            TrainID = ${trainID},
            StationID = ${stationID},
            ArrivalTime = ${arrivalTime},
            DepartureTime = ${departureTime},
            StopOrder = ${stopOrder}
        WHERE ScheduleID = ${id}
    `;
}

async function deleteSchedule(id) {

    await sql.connect(config);

    // Kiểm tra Schedule có vé hay không
    const check = await sql.query`
        SELECT COUNT(*) AS Total
        FROM Ticket
        WHERE ScheduleID = ${id}
    `;

    if (check.recordset[0].Total > 0) {

        throw new Error(
            "Không thể xóa lịch chạy vì đang có vé."
        );

    }

    // Không có vé -> cho phép xóa
    await sql.query`
        DELETE FROM Schedule
        WHERE ScheduleID = ${id}
    `;
}

module.exports = {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule
};