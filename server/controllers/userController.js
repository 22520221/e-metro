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


module.exports = {

    getAllUsers,

    createUser

};  