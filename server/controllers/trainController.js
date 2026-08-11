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
            status,
            lineId
        } = req.body;
        await trainService.addTrain(
            trainName,
            capacity,
            company,
            status,
            lineId
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

async function updateTrain(req, res) {

    try {

        const { id } = req.params;

        const {
            trainName,
            capacity,
            company,
            status,
            lineId
        } = req.body;

        if (!trainName || !capacity || !company || !status || !lineId) {

            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin."
            });

        }

        await trainService.updateTrain(

            Number(id),

            trainName,

            capacity,

            company,

            status,

            Number(lineId)

        );

        return res.json({

            message: "Cập nhật tàu thành công!"

        });

    } catch (err) {

        return res.status(500).json({

            message: err.message

        });

    }

}

async function deleteTrain(req, res) {

    try {

        const { id } = req.params;

        await trainService.deleteTrain(id);

        return res.json({

            message: "Xóa tàu thành công!"

        });

    } catch (err) {

        return res.status(500).json({

            message: err.message

        });

    }

}

module.exports = {

    getTrains,
    addTrain,
    updateTrain,
    deleteTrain

};