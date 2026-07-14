const { sql, config } = require("../config/db");

async function getAllStations() {
    await sql.connect(config);

    const result = await sql.query`
        SELECT *
        FROM Station
        ORDER BY StationID
    `;

    return result.recordset;
}

async function addStation(stationName, address) {
    await sql.connect(config);

    await sql.query`
        INSERT INTO Station (StationName, Address)
        VALUES (${stationName}, ${address})
    `;
}

async function updateStation(id, stationName, address) {
    await sql.connect(config);

    await sql.query`
        UPDATE Station
        SET
            StationName = ${stationName},
            Address = ${address}
        WHERE StationID = ${id}
    `;
}

async function deleteStation(id) {
    await sql.connect(config);

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