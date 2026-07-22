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

async function updateTrain(

    id,

    trainName,

    capacity,

    company,

    status

) {

    const pool = await sql.connect(config);

    await pool.request()

        .input("id", sql.Int, id)

        .input("trainName", sql.NVarChar, trainName)

        .input("capacity", sql.Int, capacity)

        .input("company", sql.NVarChar, company)

        .input("status", sql.NVarChar, status)

        .query(`

            UPDATE Train

            SET

                TrainName = @trainName,

                Capacity = @capacity,

                Company = @company,

                Status = @status

            WHERE TrainID = @id

        `);

}

async function deleteTrain(id) {

    const pool = await sql.connect(config);

    await pool.request()

        .input("id", sql.Int, id)

        .query(`

            DELETE FROM Train

            WHERE TrainID = @id

        `);

}

async function getTrains() {

    const response = await fetch(
        "http://localhost:3000/api/trains"
    );

    const data = await response.json();

    return data;
}

    async function addTrain(
    trainName,
    capacity,
    company,
    status
) {
    const response = await fetch(
        "http://localhost:3000/api/trains",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trainName,
                capacity,
                company,
                status
            })
        }
    );

    const data = await response.json();

    return data;
}

async function updateTrain(
    id,
    trainName,
    capacity,
    company,
    status
) {
    const response = await fetch(
        `http://localhost:3000/api/trains/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trainName,
                capacity,
                company,
                status
            })
        }
    );

    const data = await response.json();

    return data;
}

async function deleteTrain(id) {

    const response = await fetch(
        `http://localhost:3000/api/trains/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    return data;
}

module.exports = {

    getAllTrains,
    addTrain,
    updateTrain,
    deleteTrain

};