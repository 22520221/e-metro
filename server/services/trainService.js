const { sql, config } = require("../config/db");

async function getAllTrains() {

    const pool = await sql.connect(config);

    const result = await pool.request().query(
        "SELECT * FROM Train"
    );

    return result.recordset;

}


async function addTrain(

    trainName,
    capacity,
    company,
    status

) {

    const pool = await sql.connect(config);

    await pool.request()

        .input("trainName", sql.NVarChar, trainName)

        .input("capacity", sql.Int, capacity)

        .input("company", sql.NVarChar, company)

        .input("status", sql.NVarChar, status)

        .query(`

            INSERT INTO Train
            (
                TrainName,
                Capacity,
                Company,
                Status
            )

            VALUES
            (
                @trainName,
                @capacity,
                @company,
                @status
            )

        `);

}

module.exports = {

    getAllTrains,
    addTrain

};