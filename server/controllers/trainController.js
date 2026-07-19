const { json } = require("express");
const trainService = require("../services/trainService");

async function getTrains(req, res) {
    try {
        const trains = await trainService.getAllTrains();
        res.json(trains);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function addTrain(req, res) {
    try {
        const {
            trainName,
            capacity,
            company,
            status
        } = req.body;
        await trainService.addTrain(
            trainName,
            capacity,
            company,
            status
        );
        return res.json({
            message: "Thêm tàu thành công!"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {

    getTrains,
    addTrain

};