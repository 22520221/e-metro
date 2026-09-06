const userService = require("../services/userService");

// =====================================================
// GET ALL USERS
// =====================================================

async function getAllUsers(req, res) {

    try {

        const users =
            await userService.getAllUsers();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}


// =====================================================
// CREATE USER
// =====================================================

async function createUser(req, res) {

    try {

        const {
            username,
            password,
            fullName,
            email,
            role
        } = req.body;


        const user =
            await userService.createUser(
                username,
                password,
                fullName,
                email,
                role
            );


        res.status(201).json(user);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
}

// =====================================================
// UPDATE USER
// =====================================================
async function updateUser(req, res) {
    try {
        const { id } = req.params;

        const {
            username,
            fullName,
            email,
            role
        } = req.body;

        const user =
            await userService.updateUser(
                id,
                username,
                fullName,
                email,
                role
            );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


// =====================================================
// UPDATE STATUS USER
// =====================================================
async function updateUserStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user =
            await userService.updateUserStatus(
                id,
                status
            );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {

    getAllUsers,
    createUser,
    updateUser,
    updateUserStatus

};  