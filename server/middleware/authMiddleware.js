const jwt = require("jsonwebtoken");

// =====================================================
// VERIFY JWT
// =====================================================

function authenticateToken(req, res, next) {

    // 1. Lấy Authorization header

    const authHeader =
        req.headers.authorization;


    // 2. Không có header

    if (!authHeader) {

        return res.status(401).json({
            error: "Chưa đăng nhập."
        });

    }


    // 3. Kiểm tra Bearer token

    const parts =
        authHeader.split(" ");


    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        return res.status(401).json({
            error: "Token không hợp lệ."
        });

    }


    const token = parts[1];


    // 4. Verify token

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // 5. Gắn user vào request

        req.user = decoded;


        // 6. Cho request đi tiếp

        next();


    } catch (error) {

        return res.status(401).json({
            error: "Token không hợp lệ hoặc đã hết hạn."
        });

    }

}


// =====================================================
// REQUIRE ADMIN
// =====================================================

function requireAdmin(req, res, next) {

    if (!req.user) {

        return res.status(401).json({
            error: "Chưa đăng nhập."
        });

    }


    if (req.user.Role !== "Admin") {

        return res.status(403).json({
            error: "Bạn không có quyền thực hiện chức năng này."
        });

    }


    next();

}


module.exports = {

    authenticateToken,

    requireAdmin

};