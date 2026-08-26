const { sql, config } = require("../config/db");

async function getSchedules() {
    await sql.connect(config);

    const result = await sql.query`
    SELECT
        sc.*,
        tr.TrainName,
        tr.Capacity,
        st.StationName
    FROM Schedule sc
        INNER JOIN Train tr
            ON sc.TrainID = tr.TrainID
        INNER JOIN Station st
            ON sc.StationID = st.StationID
    ORDER BY sc.ScheduleID
`;

    return result.recordset;
}

    async function validateSchedule(
    trainID,
    stationID,
    arrivalTime,
    departureTime,
    stopOrder
) {

    await sql.connect(config);

    // ==========================
    // 1. Kiểm tra Train
    // ==========================

    const trainResult = await sql.query`
        SELECT TrainID
        FROM Train
        WHERE TrainID = ${trainID}
    `;

    if (trainResult.recordset.length === 0) {
        throw new Error("Tàu không tồn tại.");
    }


    // ==========================
    // 2. Kiểm tra Station
    // ==========================

    const stationResult = await sql.query`
        SELECT StationID
        FROM Station
        WHERE StationID = ${stationID}
    `;

    if (stationResult.recordset.length === 0) {
        throw new Error("Ga không tồn tại.");
    }


    // ==========================
    // 3. Kiểm tra thời gian
    // ==========================

    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);

    if (
        isNaN(arrival.getTime()) ||
        isNaN(departure.getTime())
    ) {
        throw new Error(
            "Thời gian không hợp lệ."
        );
    }

    if (arrival >= departure) {
        throw new Error(
            "Thời gian đến phải trước thời gian đi."
        );
    }


    // ==========================
    // 4. Kiểm tra StopOrder
    // ==========================

    const order = Number(stopOrder);

    if (
        !Number.isInteger(order) ||
        order <= 0
    ) {
        throw new Error(
            "Thứ tự ga phải là số nguyên dương."
        );
    }

}

    async function checkScheduleTimeConflict(
    trainID,
    arrivalTime,
    departureTime,
    excludeScheduleID = null
) {

    await sql.connect(config);

    let result;

    if (excludeScheduleID === null) {

        result = await sql.query`
            SELECT ScheduleID
            FROM Schedule
            WHERE TrainID = ${trainID}
            AND ArrivalTime < CONVERT(datetime2, ${departureTime}, 126)
            AND DepartureTime > CONVERT(datetime2, ${arrivalTime}, 126)
        `;

    } else {

        result = await sql.query`
            SELECT ScheduleID
            FROM Schedule
            WHERE TrainID = ${trainID}
            AND ScheduleID <> ${Number(excludeScheduleID)}
            AND ArrivalTime < CONVERT(datetime2, ${departureTime}, 126)
            AND DepartureTime > CONVERT(datetime2, ${arrivalTime}, 126)
        `;
    }

    return result.recordset.length > 0;
}

async function checkStopOrderConflict(
    trainID,
    stopOrder,
    excludeScheduleID = null
) {

    await sql.connect(config);

    let result;

    if (excludeScheduleID === null) {

        result = await sql.query`

            SELECT ScheduleID

            FROM Schedule

            WHERE TrainID = ${trainID}

            AND StopOrder = ${Number(stopOrder)}

        `;

    } else {

        result = await sql.query`

            SELECT ScheduleID

            FROM Schedule

            WHERE TrainID = ${trainID}

            AND StopOrder = ${Number(stopOrder)}

            AND ScheduleID <> ${Number(excludeScheduleID)}

        `;

    }

    return result.recordset.length > 0;
}

async function checkStationConflict(
    trainID,
    stationID,
    excludeScheduleID = null
) {

    await sql.connect(config);

    let result;

    if (excludeScheduleID === null) {

        result = await sql.query`

            SELECT ScheduleID

            FROM Schedule

            WHERE TrainID = ${trainID}

            AND StationID = ${stationID}

        `;

    } else {

        result = await sql.query`

            SELECT ScheduleID

            FROM Schedule

            WHERE TrainID = ${trainID}

            AND StationID = ${stationID}

            AND ScheduleID <> ${Number(excludeScheduleID)}

        `;

    }

    return result.recordset.length > 0;
}

async function addSchedule(
    trainID,
    stationID,
    arrivalTime,
    departureTime,
    stopOrder
) {

    await validateSchedule(
        trainID,
        stationID,
        arrivalTime,
        departureTime,
        stopOrder
    );

    // Chuyển datetime-local thành Date
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);

    // Kiểm tra trùng thời gian
    const hasConflict =
        await checkScheduleTimeConflict(
            trainID,
            arrival,
            departure
        );

    if (hasConflict) {
        throw new Error(
            "Lịch chạy bị trùng thời gian với lịch khác của tàu."
        );
    }

    // Kiểm tra tàu đã đi qua ga này chưa
    const hasStationConflict =
        await checkStationConflict(
            trainID,
            stationID
        );

    if (hasStationConflict) {
        throw new Error(
            "Tàu đã có lịch dừng tại ga này."
        );
    }

    await sql.connect(config);

    // Thêm lịch
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
        ${Number(trainID)},
        ${Number(stationID)},
        ${arrivalTime},
        ${departureTime},
        ${Number(stopOrder)}
    )
`;
}

async function updateSchedule(
    id,
    trainID,
    stationID,
    arrivalTime,
    departureTime,
    stopOrder
) {

    await sql.connect(config);

    // Kiểm tra Schedule tồn tại
    const scheduleResult = await sql.query`
        SELECT ScheduleID
        FROM Schedule
        WHERE ScheduleID = ${id}
    `;

    if (scheduleResult.recordset.length === 0) {
        throw new Error(
            "Lịch chạy không tồn tại."
        );
    }


    await validateSchedule(
        trainID,
        stationID,
        arrivalTime,
        departureTime,
        stopOrder
    );

    const hasConflict =
    await checkScheduleTimeConflict(
        trainID,
        arrivalTime,
        departureTime,
        id
    );

const hasStopOrderConflict =
    await checkStopOrderConflict(
        trainID,
        stopOrder,
        id
    );

const hasStationConflict =
    await checkStationConflict(
        trainID,
        stationID,
        id
    );

if (hasStopOrderConflict) {

    throw new Error(
        "Thứ tự ga đã tồn tại trong lịch của tàu."
    );

}

if (hasStationConflict) {

    throw new Error(
        "Tàu đã có lịch dừng tại ga này."
    );

}

if (hasConflict) {

    throw new Error(
        "Lịch chạy bị trùng thời gian với lịch khác của tàu."
    );

}

    await sql.query`
        UPDATE Schedule
        SET
            TrainID = ${trainID},
            StationID = ${stationID},
            ArrivalTime = CONVERT(datetime2, ${arrivalTime}, 126),
            DepartureTime = CONVERT(datetime2, ${departureTime}, 126),
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

async function checkStationExists(stationId) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT StationID
        FROM Station
        WHERE StationID = ${Number(stationId)}
    `;

    return result.recordset.length > 0;
}

async function searchSchedules(
    fromStationId,
    toStationId,
    date
) {
    await sql.connect(config);

    const result = await sql.query`
        SELECT
            fromSc.RunID,
            t.TrainID,
            t.TrainName,

            fromSc.ScheduleID AS FromScheduleID,
            fromSt.StationName AS FromStation,
            fromSc.DepartureTime AS DepartureTime,
            fromSc.StopOrder AS FromStopOrder,

            toSc.ScheduleID AS ToScheduleID,
            toSt.StationName AS ToStation,
            toSc.ArrivalTime AS ArrivalTime,
            toSc.StopOrder AS ToStopOrder

        FROM Schedule fromSc

        INNER JOIN Schedule toSc
            ON fromSc.RunID = toSc.RunID
            AND fromSc.StopOrder < toSc.StopOrder

        INNER JOIN Train t
            ON fromSc.TrainID = t.TrainID
            AND toSc.TrainID = t.TrainID

        INNER JOIN Station fromSt
            ON fromSc.StationID = fromSt.StationID

        INNER JOIN Station toSt
            ON toSc.StationID = toSt.StationID

        WHERE fromSc.StationID = ${Number(fromStationId)}
        AND toSc.StationID = ${Number(toStationId)}
        AND CAST(fromSc.DepartureTime AS DATE) = ${date}

        ORDER BY fromSc.DepartureTime
    `;

    return result.recordset;
}

module.exports = {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    searchSchedules,
    validateSchedule,
    checkScheduleTimeConflict,
    checkStopOrderConflict,
    checkStationConflict,
    checkStationExists
};