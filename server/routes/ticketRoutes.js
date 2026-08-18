const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.getTickets);

router.post("/", ticketController.addTicket);

router.put("/:id", ticketController.updateTicket);

router.put("/:id/cancel", ticketController.cancelTicket);

module.exports = router;