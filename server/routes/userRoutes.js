const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/",userController.getAllUsers);

router.post("/",userController.createUser);

router.put("/:id",userController.updateUser);

router.put("/:id/status",userController.updateUserStatus);

module.exports = router;