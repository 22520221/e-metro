const sql = require("mssql");

const config = {
    user: "sa",               // đổi theo SQL Server của bạn
    password: "dat123456",       // đổi mật khẩu
    server: "TRANGDEPTRAI\\SQLEXPRESS",
    database: "MetroDB",

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    sql,
    config
};