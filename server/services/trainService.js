const { sql, config } = require("../config/db");

async function getAllTrains() {

    const pool = await sql.connect(config);

    const result = await pool.request().query(`
        SELECT
            t.*,
            l.LineName
        FROM Train t
        LEFT JOIN Line l
            ON t.LineID = l.LineID
        ORDER BY t.TrainID
    `);

    return result.recordset;
}


async function addTrain(
    trainName,
    capacity,
    company,
    status,
    lineId
) {
    const pool = await sql.connect(config);

    await pool.request()
        .input("trainName", sql.NVarChar, trainName)
        .input("capacity", sql.Int, capacity)
        .input("company", sql.NVarChar, company)
        .input("status", sql.NVarChar, status)
        .input("lineId", sql.Int, lineId)
        .query(`
            INSERT INTO Train
            (
                TrainName,
                Capacity,
                Company,
                Status,
                LineID
            )
            VALUES
            (
                @trainName,
                @capacity,
                @company,
                @status,
                @lineId
            )
        `);
}

async function updateTrain(
    id,
    trainName,
    capacity,
    company,
    status,
    lineId
) {
    const pool = await sql.connect(config);

    await pool.request()
        .input("id", sql.Int, id)
        .input("trainName", sql.NVarChar, trainName)
        .input("capacity", sql.Int, capacity)
        .input("company", sql.NVarChar, company)
        .input("status", sql.NVarChar, status)
        .input("lineId", sql.Int, lineId)
        .query(`
            UPDATE Train
            SET
                TrainName = @trainName,
                Capacity = @capacity,
                Company = @company,
                Status = @status,
                LineID = @lineId
            WHERE TrainID = @id
        `);
}

async function deleteTrain(id) {

    const pool = await sql.connect(config);

    // Kiểm tra tàu có đang được sử dụng trong Schedule không 
    const check = await pool.request() 
        .input("id", sql.Int, id) 
        .query(
            ` SELECT COUNT(*) AS Total 
            FROM Schedule 
            WHERE TrainID = @id 
            `); 

        if (check.recordset[0].Total > 0) 
            { throw new Error( 
                "Không thể xóa tàu vì tàu đang có lịch chạy." 
            ); 
        }

    await pool.request()

        .input("id", sql.Int, id)

        .query(`

            DELETE FROM Train

            WHERE TrainID = @id

        `);

}

module.exports = {

    getAllTrains,
    addTrain,
    updateTrain,
    deleteTrain

};