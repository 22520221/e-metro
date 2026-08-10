const dashboardService = require("../services/dashboardService");

async function getDashboardStats(req, res) {
    try {

        const stats = await dashboardService.getDashboardStats();

        res.json(stats);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function getTicketStats(req, res) {
    try {

        const stats = await dashboardService.getTicketStats();

        res.json(stats);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function getRevenue(req, res) {

    try {

        const revenue = await dashboardService.getRevenue();

        res.json(revenue);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}

async function getRevenueByDate(req, res) {

    try {

        const revenue = await dashboardService.getRevenueByDate();

        res.json(revenue);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}

module.exports = {
    getDashboardStats,
    getTicketStats,
    getRevenue,
    getRevenueByDate
};