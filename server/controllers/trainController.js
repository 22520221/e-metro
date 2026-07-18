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

module.exports = {

    getTrains

};