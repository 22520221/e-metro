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