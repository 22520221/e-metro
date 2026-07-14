const stationService = require("../services/stationService");

async function getStations(req, res) {
    try {

        const stations = await stationService.getAllStations();

        res.json(stations);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function addStation(req, res) {
    try {

        const { stationName, address } = req.body;

        await stationService.addStation(
            stationName,
            address
        );

        res.json({
            message: "Thêm ga thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function updateStation(req, res) {
    try {

        const { id } = req.params;

        const { stationName, address } = req.body;

        await stationService.updateStation(
            id,
            stationName,
            address
        );

        res.json({
            message: "Cập nhật ga thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function deleteStation(req, res) {
    try {

        const { id } = req.params;

        await stationService.deleteStation(id);

        res.json({
            message: "Xóa ga thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    getStations,
    addStation,
    updateStation,
    deleteStation
};