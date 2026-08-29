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


        const user =
            await authService.login(
                username,
                password
            );


        res.status(200).json({
            message: "Đăng nhập thành công.",
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