const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.getTickets);

router.get("/run/:runID",ticketController.getTicketsByRunID);

router.get("/run/:runID/seats",ticketController.getSeatsByRunID);

router.get("/schedule/:scheduleID",ticketController.getTicketsByScheduleID);

router.get("/run/:runID/statistics",ticketController.getTicketStatisticsByRunID);

router.get("/schedule/:scheduleID/statistics",ticketController.getTicketStatisticsByScheduleID);

router.get("/search",ticketController.searchTicketsByPassengerName);

router.get("/status/:status",ticketController.getTicketsByStatus);

router.post("/", ticketController.addTicket);

router.put("/:id", ticketController.updateTicket);

router.put("/:id/cancel", ticketController.cancelTicket);

module.exports = router;