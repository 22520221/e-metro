const { sql, config } = require("../config/db");

// =====================================================
// GET ALL STATIONS
// =====================================================

async function getAllStations() {

    await sql.connect(config);

    const result = await sql.query`
        SELECT 
            s.StationID, 
            s.StationName, 
            s.Address, 
            s.LineID, 
            l.LineName 
        FROM Station s 
        INNER JOIN Line l 
            ON s.LineID = l.LineID 
        ORDER BY s.StationID 
    `;

    return result.recordset;
}


// =====================================================
// VALIDATE STATION DATA
// =====================================================

function validateStationData(
    stationName,
    address,
    lineId
) {

    // 1. Kiểm tra tên ga

    if (
        typeof stationName !== "string" ||
        stationName.trim() === ""
    ) {

        throw new Error(
            "Tên ga không được để trống."
        );

    }


    // 2. Kiểm tra địa chỉ

    if (
        typeof address !== "string" ||
        address.trim() === ""
    ) {

        throw new Error(
            "Địa chỉ ga không được để trống."
        );

    }


    // 3. Kiểm tra LineID

    const line = Number(lineId);

    if (
        !Number.isInteger(line) ||
        line <= 0
    ) {

        throw new Error(
            "LineID phải là số nguyên dương."
        );

    }

}


// =====================================================
// CHECK LINE EXISTS
// =====================================================

async function checkLineExists(lineId) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT LineID
        FROM Line
        WHERE LineID = ${Number(lineId)}
    `;

    return result.recordset.length > 0;
}


// =====================================================
// CHECK STATION EXISTS
// =====================================================

async function checkStationExists(id) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT StationID
        FROM Station
        WHERE StationID = ${Number(id)}
    `;

    return result.recordset.length > 0;
}


// =====================================================
// CHECK STATION NAME CONFLICT
// =====================================================

async function checkStationNameConflict(
    stationName,
    excludeStationID = null
) {

    await sql.connect(config);

    const name = stationName.trim();

    let result;

    if (excludeStationID === null) {

        result = await sql.query`
            SELECT StationID
            FROM Station
            WHERE LOWER(LTRIM(RTRIM(StationName)))
                = LOWER(${name})
        `;

    } else {

        result = await sql.query`
            SELECT StationID
            FROM Station
            WHERE LOWER(LTRIM(RTRIM(StationName)))
                = LOWER(${name})
            AND StationID <> ${Number(excludeStationID)}
        `;

    }

    return result.recordset.length > 0;
}


// =====================================================
// ADD STATION
// =====================================================

async function addStation(
    stationName,
    address,
    lineId
) {

    // 1. Validate dữ liệu

    validateStationData(
        stationName,
        address,
        lineId
    );


    // 2. Kiểm tra Line tồn tại

    const lineExists =
        await checkLineExists(lineId);

    if (!lineExists) {

        throw new Error(
            "Tuyến tàu không tồn tại."
        );

    }


    // 3. Kiểm tra trùng tên ga

    const nameConflict =
        await checkStationNameConflict(
            stationName
        );

    if (nameConflict) {

        throw new Error(
            "Tên ga đã tồn tại."
        );

    }


    // 4. INSERT

    await sql.connect(config);

    await sql.query`
        INSERT INTO Station
        (
            StationName,
            Address,
            LineID
        )
        VALUES
        (
            ${stationName.trim()},
            ${address.trim()},
            ${Number(lineId)}
        )
    `;
}


// =====================================================
// UPDATE STATION
// =====================================================

async function updateStation(
    id,
    stationName,
    address,
    lineId
) {

    const stationID = Number(id);


    // 1. Kiểm tra ID

    if (
        !Number.isInteger(stationID) ||
        stationID <= 0
    ) {

        throw new Error(
            "StationID không hợp lệ."
        );

    }


    // 2. Kiểm tra Station tồn tại

    const stationExists =
        await checkStationExists(stationID);

    if (!stationExists) {

        throw new Error(
            "Ga không tồn tại."
        );

    }


    // 3. Validate dữ liệu

    validateStationData(
        stationName,
        address,
        lineId
    );


    // 4. Kiểm tra Line tồn tại

    const lineExists =
        await checkLineExists(lineId);

    if (!lineExists) {

        throw new Error(
            "Tuyến tàu không tồn tại."
        );

    }


    // 5. Kiểm tra trùng tên

    // Loại trừ chính Station đang update

    const nameConflict =
        await checkStationNameConflict(
            stationName,
            stationID
        );

    if (nameConflict) {

        throw new Error(
            "Tên ga đã tồn tại."
        );

    }


    // 6. UPDATE

    await sql.connect(config);

    await sql.query`
        UPDATE Station
        SET
            StationName = ${stationName.trim()},
            Address = ${address.trim()},
            LineID = ${Number(lineId)}
        WHERE StationID = ${stationID}
    `;
}


// =====================================================
// DELETE STATION
// =====================================================

async function deleteStation(id) {

    await sql.connect(config);


    // Kiểm tra Station tồn tại

    const stationExists =
        await checkStationExists(id);

    if (!stationExists) {

        throw new Error(
            "Ga không tồn tại."
        );

    }


    // Kiểm tra ga có đang được sử dụng
    // trong Schedule không

    const check = await sql.query`
        SELECT COUNT(*) AS Total
        FROM Schedule
        WHERE StationID = ${Number(id)}
    `;


    if (check.recordset[0].Total > 0) {

        throw new Error(
            "Không thể xóa ga vì ga đang có lịch chạy."
        );

    }


    // Xóa

    await sql.query`
        DELETE FROM Station
        WHERE StationID = ${Number(id)}
    `;
}


module.exports = {

    getAllStations,

    addStation,

    updateStation,

    deleteStation,

    validateStationData,

    checkLineExists,

    checkStationExists,

    checkStationNameConflict

};

