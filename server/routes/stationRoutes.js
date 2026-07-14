const express = require("express");

const router = express.Router();

const stationController = require("../controllers/stationController");

router.get("/", stationController.getStations);

router.post("/", stationController.addStation);

router.put("/:id", stationController.updateStation);

router.delete("/:id", stationController.deleteStation);

module.exports = router;