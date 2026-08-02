const express = require("express");

const router = express.Router();

const lineController = require("../controllers/lineController");

router.get("/", lineController.getLines);

router.post("/", lineController.addLine);

router.put("/:id", lineController.updateLine);

router.delete("/:id", lineController.deleteLine);

module.exports = router;