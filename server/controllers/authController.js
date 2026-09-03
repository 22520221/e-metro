const jwt = require("jsonwebtoken");

const authService = require("../services/authService");

// =====================================================
// LOGIN
// =====================================================

async function login(req, res) {

    try {

        const {
            username,
            password
        } = req.body;


        // 1. Kiểm tra username + password
        const user =
            await authService.login(
                username,
                password
            );


        // 2. Tạo JWT
        const token = jwt.sign(

            {
                UserID: user.UserID,
                Username: user.Username,
                Role: user.Role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        // 3. Trả kết quả
        res.status(200).json({

            message: "Đăng nhập thành công.",

            token,

            user

        });


    } catch (error) {

        res.status(400).json({

            error: error.message

        });

    }

}


module.exports = {
    login
};