const stationService = require("../services/stationService");

// =====================================================
// GET
// =====================================================
async function getStations(req, res) {

    try {

        const stations =
            await stationService.getAllStations();

        res.json(stations);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}


// =====================================================
// ADD
// =====================================================
async function addStation(req, res) {

    try {

        const {
            stationName,
            address,
            lineId
        } = req.body;


        await stationService.addStation(
            stationName,
            address,
            lineId
        );


        res.status(201).json({
            message: "Thêm ga thành công!"
        });

    } catch (err) {

        res.status(400).json({
            error: err.message
        });

    }

}


// =====================================================
// UPDATE
// =====================================================
async function updateStation(req, res) {

    try {

        const id =
            Number(req.params.id);

        const {
            stationName,
            address,
            lineId
        } = req.body;


        await stationService.updateStation(
            id,
            stationName,
            address,
            lineId
        );


        res.json({
            message: "Cập nhật ga thành công!"
        });

    } catch (err) {

        res.status(400).json({
            error: err.message
        });

    }

}


// =====================================================
// DELETE
// =====================================================
async function deleteStation(req, res) {

    try {

        const id =
            Number(req.params.id);


        await stationService.deleteStation(id);


        res.json({
            message: "Xóa ga thành công!"
        });

    } catch (err) {

        res.status(400).json({
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
