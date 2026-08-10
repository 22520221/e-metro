const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getDashboardStats);

router.get("/tickets", dashboardController.getTicketStats);

router.get("/revenue", dashboardController.getRevenue);

router.get(
    "/revenue-by-date",
    dashboardController.getRevenueByDate
);

module.exports = router;