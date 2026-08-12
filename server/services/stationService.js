const { sql, config } = require("../config/db");

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

async function addStation(stationName, address, lineId) {
    await sql.connect(config);

    await sql.query`
        INSERT INTO Station (StationName, Address, LineId)
        VALUES (${stationName}, ${address}, ${lineId})
    `;
}

async function updateStation(id, stationName, address, lineId) {
    await sql.connect(config);

    await sql.query`
        UPDATE Station
        SET
            StationName = ${stationName},
            Address = ${address},
            LineID = ${lineId}
        WHERE StationID = ${id}
    `;
}

async function deleteStation(id) {
    await sql.connect(config);

    // Kiểm tra ga có đang được sử dụng trong Schedule không 
    const check = await sql.query
    ` SELECT COUNT(*) AS Total 
    FROM Schedule 
    WHERE StationID = ${id} 
    `; 
    
    if (check.recordset[0].Total > 0) { 
        throw new Error( 
            "Không thể xóa ga vì ga đang có lịch chạy." 
            ); 
        }

    await sql.query`
        DELETE FROM Station
        WHERE StationID = ${id} 
    `;
}

module.exports = {
    getAllStations,
    addStation,
    updateStation,
    deleteStation
};