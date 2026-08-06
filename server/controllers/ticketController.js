const ticketService = require("../services/ticketService");

async function getTickets(req, res) {
    try {

        const tickets = await ticketService.getTickets();

        res.json(tickets);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function addTicket(req, res) {
    try {

        const { scheduleID, passengerName, seatNumber, price, status } = req.body;

        await ticketService.addTicket(
            scheduleID, 
            passengerName, 
            seatNumber, 
            price, 
            status
        );

        res.json({
            message: "Thêm vé thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function updateTicket(req, res) {
    try {

        const { id } = req.params;

        const { scheduleID, 
            passengerName, 
            seatNumber, 
            price, 
            status } = req.body;

        await ticketService.updateTicket(
            id,
            scheduleID, 
            passengerName, 
            seatNumber, 
            price, 
            status
        );

        res.json({
            message: "Cập nhật vé thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function deleteTicket(req, res) {
    try {

        const { id } = req.params;

        await ticketService.deleteTicket(id);

        res.json({
            message: "Xóa vé thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    getTickets,
    addTicket,
    updateTicket,
    deleteTicket
};