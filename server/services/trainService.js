const { sql, config } = require("../config/db");


// =====================================================
// GET ALL TRAINS
// =====================================================

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


// =====================================================
// VALIDATE TRAIN
// =====================================================

async function validateTrain(
    trainName,
    capacity,
    company,
    status,
    lineId
) {

    // ==========================
    // 1. Tên tàu
    // ==========================

    if (
        typeof trainName !== "string" ||
        trainName.trim() === ""
    ) {
        throw new Error(
            "Tên tàu không được để trống."
        );
    }


    // ==========================
    // 2. Capacity
    // ==========================

    const trainCapacity = Number(capacity);

    if (
        !Number.isInteger(trainCapacity) ||
        trainCapacity <= 0
    ) {
        throw new Error(
            "Sức chứa tàu phải là số nguyên dương."
        );
    }


    // ==========================
    // 3. Company
    // ==========================

    if (
        typeof company !== "string" ||
        company.trim() === ""
    ) {
        throw new Error(
            "Tên công ty không được để trống."
        );
    }


    // ==========================
    // 4. Status
    // ==========================

    const validStatuses = [
        "Active",
        "Inactive",
        "Maintenance"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error(
            "Trạng thái tàu không hợp lệ."
        );
    }


    // ==========================
    // 5. Line
    // ==========================

    const line = Number(lineId);

    if (
        !Number.isInteger(line) ||
        line <= 0
    ) {
        throw new Error(
            "LineID không hợp lệ."
        );
    }
}


// =====================================================
// CHECK TRAIN NAME CONFLICT
// =====================================================

async function checkTrainNameConflict(
    trainName,
    excludeTrainID = null
) {

    const pool = await sql.connect(config);

    let result;

    if (excludeTrainID === null) {

        result = await pool.request()
            .input(
                "trainName",
                sql.NVarChar,
                trainName.trim()
            )
            .query(`
                SELECT TrainID
                FROM Train
                WHERE TrainName = @trainName
            `);

    } else {

        result = await pool.request()
            .input(
                "trainName",
                sql.NVarChar,
                trainName.trim()
            )
            .input(
                "excludeTrainID",
                sql.Int,
                Number(excludeTrainID)
            )
            .query(`
                SELECT TrainID
                FROM Train
                WHERE TrainName = @trainName
                AND TrainID <> @excludeTrainID
            `);
    }

    return result.recordset.length > 0;
}


// =====================================================
// ADD TRAIN
// =====================================================

async function addTrain(
    trainName,
    capacity,
    company,
    status,
    lineId
) {

    // ==========================
    // Validate dữ liệu
    // ==========================

    await validateTrain(
        trainName,
        capacity,
        company,
        status,
        lineId
    );


    // ==========================
    // Kiểm tra trùng tên
    // ==========================

    const hasNameConflict =
        await checkTrainNameConflict(
            trainName
        );

    if (hasNameConflict) {

        throw new Error(
            "Tên tàu đã tồn tại."
        );
    }


    // ==========================
    // INSERT
    // ==========================

    const pool = await sql.connect(config);

    await pool.request()
        .input(
            "trainName",
            sql.NVarChar,
            trainName.trim()
        )
        .input(
            "capacity",
            sql.Int,
            Number(capacity)
        )
        .input(
            "company",
            sql.NVarChar,
            company.trim()
        )
        .input(
            "status",
            sql.NVarChar,
            status
        )
        .input(
            "lineId",
            sql.Int,
            Number(lineId)
        )
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


// =====================================================
// UPDATE TRAIN
// =====================================================

async function checkLineExists(lineId) {

    const pool = await sql.connect(config);

    const result = await pool.request()
        .input("lineId", sql.Int, Number(lineId))
        .query(`
            SELECT LineID
            FROM Line
            WHERE LineID = @lineId
        `);

    return result.recordset.length > 0;
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

    // ==========================
    // 1. Kiểm tra TrainID
    // ==========================

    const trainID = Number(id);

    if (!Number.isInteger(trainID) || trainID <= 0) {

        throw new Error(
            "TrainID không hợp lệ."
        );

    }


    // ==========================
    // 2. Kiểm tra tàu tồn tại
    // ==========================

    const trainResult = await pool.request()
        .input("id", sql.Int, trainID)
        .query(`
            SELECT TrainID
            FROM Train
            WHERE TrainID = @id
        `);

    if (trainResult.recordset.length === 0) {

        throw new Error(
            "Tàu không tồn tại."
        );

    }


    // ==========================
    // 3. Validate tên tàu
    // ==========================

    if (
        typeof trainName !== "string" ||
        trainName.trim() === ""
    ) {

        throw new Error(
            "Tên tàu không được để trống."
        );

    }


    const cleanTrainName = trainName.trim();


    // ==========================
    // 4. Validate Capacity
    // ==========================

    const trainCapacity = Number(capacity);

    if (
        !Number.isInteger(trainCapacity) ||
        trainCapacity <= 0
    ) {

        throw new Error(
            "Sức chứa tàu phải là số nguyên dương."
        );

    }


    // ==========================
    // 5. Validate Company
    // ==========================

    if (
        typeof company !== "string" ||
        company.trim() === ""
    ) {

        throw new Error(
            "Tên công ty không được để trống."
        );

    }


    const cleanCompany = company.trim();


    // ==========================
    // 6. Validate Status
    // ==========================

    const validStatuses = [
        "Active",
        "Inactive",
        "Maintenance"
    ];

    if (!validStatuses.includes(status)) {

        throw new Error(
            "Trạng thái tàu không hợp lệ."
        );

    }


    // ==========================
    // 7. Validate LineID
    // ==========================

    const trainLineID = Number(lineId);

    if (
        !Number.isInteger(trainLineID) ||
        trainLineID <= 0
    ) {

        throw new Error(
            "LineID không hợp lệ."
        );

    }


    // ==========================
    // 8. Kiểm tra Line tồn tại
    // ==========================

    const lineResult = await pool.request()
        .input("lineId", sql.Int, trainLineID)
        .query(`
            SELECT LineID
            FROM Line
            WHERE LineID = @lineId
        `);

    if (lineResult.recordset.length === 0) {

        throw new Error(
            "Tuyến tàu không tồn tại."
        );

    }


    // ==========================
    // 9. Kiểm tra trùng tên tàu
    // ==========================

    const nameConflict =
        await checkTrainNameConflict(
            cleanTrainName,
            trainID
        );

    if (nameConflict) {

        throw new Error(
            "Tên tàu đã tồn tại."
        );

    }


    // ==========================
    // 10. UPDATE
    // ==========================

    await pool.request()
        .input("id", sql.Int, trainID)
        .input("trainName", sql.NVarChar, cleanTrainName)
        .input("capacity", sql.Int, trainCapacity)
        .input("company", sql.NVarChar, cleanCompany)
        .input("status", sql.NVarChar, status)
        .input("lineId", sql.Int, trainLineID)
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
// =====================================================
// DELETE TRAIN
// =====================================================

async function deleteTrain(id) {

    const pool = await sql.connect(config);

    const trainID = Number(id);

    if (!Number.isInteger(trainID)) {

        throw new Error(
            "TrainID không hợp lệ."
        );
    }


    // ==========================
    // Kiểm tra Schedule
    // ==========================

    const check = await pool.request()
        .input(
            "id",
            sql.Int,
            trainID
        )
        .query(`
            SELECT COUNT(*) AS Total
            FROM Schedule
            WHERE TrainID = @id
        `);


    if (check.recordset[0].Total > 0) {

        throw new Error(
            "Không thể xóa tàu vì tàu đang có lịch chạy."
        );
    }


    // ==========================
    // DELETE
    // ==========================

    await pool.request()
        .input(
            "id",
            sql.Int,
            trainID
        )
        .query(`
            DELETE FROM Train
            WHERE TrainID = @id
        `);
}


module.exports = {

    getAllTrains,
    addTrain,
    updateTrain,
    deleteTrain,

    validateTrain,
    checkTrainNameConflict,
    checkLineExists

};