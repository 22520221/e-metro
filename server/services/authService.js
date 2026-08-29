const bcrypt = require("bcrypt");
const { sql, config } = require("../config/db");

// =====================================================
// LOGIN
// =====================================================

async function login(username, password) {

    // 1. Validate username

    if (
        typeof username !== "string" ||
        username.trim() === ""
    ) {

        throw new Error(
            "Tên đăng nhập không được để trống."
        );

    }


    // 2. Validate password

    if (
        typeof password !== "string" ||
        password === ""
    ) {

        throw new Error(
            "Mật khẩu không được để trống."
        );

    }


    // 3. Tìm user

    await sql.connect(config);

    const result = await sql.query`
        SELECT
            UserID,
            Username,
            PasswordHash,
            FullName,
            Email,
            Role,
            Status
        FROM Users
        WHERE LOWER(LTRIM(RTRIM(Username)))
            = LOWER(${username.trim()})
    `;


    // 4. Không tìm thấy user

    if (result.recordset.length === 0) {

        throw new Error(
            "Tên đăng nhập hoặc mật khẩu không đúng."
        );

    }


    const user = result.recordset[0];


    // 5. Kiểm tra tài khoản

    if (user.Status !== "Active") {

        throw new Error(
            "Tài khoản đã bị khóa hoặc không hoạt động."
        );

    }


    // 6. Kiểm tra password

    const passwordMatch =
        await bcrypt.compare(
            password,
            user.PasswordHash
        );


    if (!passwordMatch) {

        throw new Error(
            "Tên đăng nhập hoặc mật khẩu không đúng."
        );

    }


    // 7. Không trả PasswordHash

    return {
        UserID: user.UserID,
        Username: user.Username,
        FullName: user.FullName,
        Email: user.Email,
        Role: user.Role,
        Status: user.Status
    };

}


module.exports = {
    login
};