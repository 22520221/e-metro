const express = require("express");

const router = express.Router();

const scheduleController = require("../controllers/scheduleController");

router.get("/search", scheduleController.searchSchedules);

router.get("/", scheduleController.getSchedules);

router.post("/", scheduleController.addSchedule);

router.put("/:id", scheduleController.updateSchedule);

router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;