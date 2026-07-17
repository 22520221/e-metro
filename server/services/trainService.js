async function getAllTrains() {

    const pool = await sql.connect(config);

    const result = await pool.request().query(
        "SELECT * FROM Train"
    );

    return result.recordset;

}