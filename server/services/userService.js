const bcrypt = require("bcrypt");
const { sql, config } = require("../config/db");

// =====================================================
// GET ALL USERS
// =====================================================

//mật khẩu chung của các tài khoản là 123456

async function getAllUsers() {

    await sql.connect(config);

    const result = await sql.query`
        SELECT
            UserID,
            Username,
            FullName,
            Email,
            Role,
            Status,
            CreatedAt
        FROM Users
        ORDER BY UserID
    `;

    return result.recordset;
}


// =====================================================
// VALIDATE USER DATA
// =====================================================

function validateUserData(
    username,
    password,
    fullName,
    email,
    role
) {

    // Username

    if (
        typeof username !== "string" ||
        username.trim() === ""
    ) {

        throw new Error(
            "Tên đăng nhập không được để trống."
        );

    }


    // Password

    if (
        typeof password !== "string" ||
        password === ""
    ) {

        throw new Error(
            "Mật khẩu không được để trống."
        );

    }


    // FullName

    if (
        typeof fullName !== "string" ||
        fullName.trim() === ""
    ) {

        throw new Error(
            "Họ tên không được để trống."
        );

    }


    // Role

    const validRoles = [
        "Admin",
        "Staff",
        "Customer"
    ];

    if (!validRoles.includes(role)) {

        throw new Error(
            "Role không hợp lệ."
        );

    }

}


// =====================================================
// CHECK USERNAME CONFLICT
// =====================================================

async function checkUsernameConflict(username) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT UserID
        FROM Users
        WHERE LOWER(LTRIM(RTRIM(Username)))
            = LOWER(${username.trim()})
    `;

    return result.recordset.length > 0;
}


// =====================================================
// CREATE USER
// =====================================================

async function createUser(
    username,
    password,
    fullName,
    email,
    role = "Customer"
) {

    // 1. Validate

    validateUserData(
        username,
        password,
        fullName,
        email,
        role
    );


    // 2. Kiểm tra username trùng

    const usernameExists =
        await checkUsernameConflict(username);

    if (usernameExists) {

        throw new Error(
            "Tên đăng nhập đã tồn tại."
        );

    }


    // 3. Hash password

    const passwordHash =
        await bcrypt.hash(password, 10);


    // 4. INSERT

    await sql.connect(config);

    const result = await sql.query`
        INSERT INTO Users
        (
            Username,
            PasswordHash,
            FullName,
            Email,
            Role,
            Status
        )
        OUTPUT
            INSERTED.UserID,
            INSERTED.Username,
            INSERTED.FullName,
            INSERTED.Email,
            INSERTED.Role,
            INSERTED.Status,
            INSERTED.CreatedAt
        VALUES
        (
            ${username.trim()},
            ${passwordHash},
            ${fullName.trim()},
            ${email || null},
            ${role},
            'Active'
        )
    `;

    return result.recordset[0];
}

// =====================================================
// UPDATE USER
// =====================================================
async function updateUser(
    userId,
    username,
    fullName,
    email,
    role
) {
    // Validate dữ liệu
    if (
        typeof username !== "string" ||
        username.trim() === ""
    ) {
        throw new Error(
            "Tên đăng nhập không được để trống."
        );
    }

    if (
        typeof fullName !== "string" ||
        fullName.trim() === ""
    ) {
        throw new Error(
            "Họ tên không được để trống."
        );
    }

    const validRoles = [
        "Admin",
        "Staff",
        "Customer"
    ];

    if (!validRoles.includes(role)) {
        throw new Error(
            "Role không hợp lệ."
        );
    }

    // Kiểm tra username có bị trùng với User khác không
    await sql.connect(config);

    const conflictResult = await sql.query`
        SELECT UserID
        FROM Users
        WHERE LOWER(LTRIM(RTRIM(Username)))
            = LOWER(${username.trim()})
        AND UserID <> ${userId}
    `;

    if (conflictResult.recordset.length > 0) {
        throw new Error(
            "Tên đăng nhập đã tồn tại."
        );
    }

    // Cập nhật User
    const result = await sql.query`
        UPDATE Users
        SET
            Username = ${username.trim()},
            FullName = ${fullName.trim()},
            Email = ${email || null},
            Role = ${role}
        OUTPUT
            INSERTED.UserID,
            INSERTED.Username,
            INSERTED.FullName,
            INSERTED.Email,
            INSERTED.Role,
            INSERTED.Status,
            INSERTED.CreatedAt
        WHERE UserID = ${userId}
    `;

    if (result.recordset.length === 0) {
        throw new Error(
            "Không tìm thấy người dùng."
        );
    }

    return result.recordset[0];
}

// =====================================================
// UPDATE STATUS USER
// =====================================================
async function updateUserStatus(userId, status) {
    const validStatuses = [
        "Active",
        "Inactive"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error(
            "Status không hợp lệ."
        );
    }

    await sql.connect(config);

    const result = await sql.query`
        UPDATE Users
        SET Status = ${status}
        OUTPUT
            INSERTED.UserID,
            INSERTED.Username,
            INSERTED.FullName,
            INSERTED.Email,
            INSERTED.Role,
            INSERTED.Status,
            INSERTED.CreatedAt
        WHERE UserID = ${userId}
    `;

    if (result.recordset.length === 0) {
        throw new Error(
            "Không tìm thấy người dùng."
        );
    }

    return result.recordset[0];
}


module.exports = {

    getAllUsers,
    createUser,
    updateUser,
    validateUserData,
    checkUsernameConflict,
    updateUserStatus

};