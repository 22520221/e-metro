const express = require("express");

const router = express.Router();

const trainController =
    require("../controllers/trainController");

router.get("/", trainController.getTrains);

router.post("/", trainController.addTrain);

router.put("/:id", trainController.updateTrain);

router.delete("/:id", trainController.deleteTrain);

module.exports = router;