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

function isValidDate(date) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    const d = new Date(year, month - 1, day);

    return (
        d.getFullYear() === year &&
        d.getMonth() === month - 1 &&
        d.getDate() === day
    );
}

async function searchSchedules(req, res) {
    try {

        const {
            fromStationId,
            toStationId,
            date
        } = req.query;

        if (!fromStationId || !toStationId || !date) {
            return res.status(400).json({
                error: "Vui lòng nhập ga đi, ga đến và ngày đi."
            });
        }

        if (
            !Number.isInteger(Number(fromStationId)) ||
            !Number.isInteger(Number(toStationId))
        ) {
            return res.status(400).json({
                error: "ID ga không hợp lệ."
            });
        }

        if (Number(fromStationId) === Number(toStationId)) {
            return res.status(400).json({
                error: "Ga đi và ga đến không được giống nhau."
            });
        }

        if (!isValidDate(date)) {
    return res.status(400).json({
        error: "Ngày đi không hợp lệ."
    });
}

        const fromExists =
    await scheduleService.checkStationExists(
        fromStationId
    );

if (!fromExists) {
    return res.status(400).json({
        error: "Ga đi không tồn tại."
    });
}

const toExists =
    await scheduleService.checkStationExists(
        toStationId
    );

if (!toExists) {
    return res.status(400).json({
        error: "Ga đến không tồn tại."
    });
}

        const result =
            await scheduleService.searchSchedules(
                fromStationId,
                toStationId,
                date
            );

        if (result.length === 0) {
            return res.status(404).json({
                error: "Không tìm thấy chuyến phù hợp."
            });
        }

        res.json(result);

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
    deleteSchedule,
    searchSchedules
};