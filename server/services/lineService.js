const { sql, config } = require("../config/db");

async function getLines() {
    await sql.connect(config);

    const result = await sql.query`
        SELECT *
        FROM Line
        ORDER BY LineID
    `;

    return result.recordset;
}

async function addLine(LineName, LineColor) {
    await sql.connect(config);

    await sql.query`
        INSERT INTO Line (LineName, LineColor)
        VALUES (${LineName}, ${LineColor})
    `;
}

async function updateLine(id, LineName, LineColor) {
    await sql.connect(config);

    await sql.query`
        UPDATE Line
        SET
            LineName = ${LineName},
            LineColor = ${LineColor}
        WHERE LineID = ${id}
    `;
}

async function deleteLine(id) {

    await sql.connect(config);

    // Kiểm tra Line có Station đang sử dụng không
    const stationCheck = await sql.query`
        SELECT COUNT(*) AS Total
        FROM Station
        WHERE LineID = ${id}
    `;

    // Kiểm tra Line có Train đang sử dụng không
    const trainCheck = await sql.query`
        SELECT COUNT(*) AS Total
        FROM Train
        WHERE LineID = ${id}
    `;

    const stationCount = stationCheck.recordset[0].Total;
    const trainCount = trainCheck.recordset[0].Total;

    if (stationCount > 0 || trainCount > 0) {

        throw new Error(
            "Không thể xóa tuyến vì đang có ga hoặc tàu sử dụng tuyến này."
        );

    }

    // Không có Station và Train -> cho phép xóa
    await sql.query`
        DELETE FROM Line
        WHERE LineID = ${id}
    `;
}

module.exports = {
    getLines,
    addLine,
    updateLine,
    deleteLine
};