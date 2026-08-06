const scheduleService = require("../services/scheduleService");

async function getSchedules(req, res) {
    try {

        const schedules = await scheduleService.getSchedules();

        res.json(schedules);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function addSchedule(req, res) {
    try {

        console.log(req.body);  

        const { trainID, stationID, arrivalTime, departureTime, stopOrder } = req.body;

        await scheduleService.addSchedule(
            trainID, 
            stationID, 
            arrivalTime, 
            departureTime, 
            stopOrder
        );

        res.json({
            message: "Thêm lịch thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function updateSchedule(req, res) {
    try {

        const { id } = req.params;

        const { trainID, stationID, arrivalTime, departureTime, stopOrder } = req.body;

        await scheduleService.updateSchedule(
            id,
            trainID, 
            stationID, 
            arrivalTime, 
            departureTime, 
            stopOrder
        );

        res.json({
            message: "Cập nhật lịch thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function deleteSchedule(req, res) {
    try {

        const { id } = req.params;

        await scheduleService.deleteSchedule(id);

        res.json({
            message: "Xóa lịch thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule
};