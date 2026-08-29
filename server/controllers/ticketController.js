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

function validateTicketData(
    scheduleID,
    passengerName,
    seatNumber,
    price
) {
    if (!scheduleID) {
        return "Vui lòng chọn lịch chạy.";
    }

    if (
        typeof passengerName !== "string" ||
        passengerName.trim() === ""
    ) {
        return "Tên hành khách không được để trống.";
    }

    if (
        typeof seatNumber !== "string" ||
        seatNumber.trim() === ""
    ) {
        return "Số ghế không được để trống.";
    }

    if (
        price === "" ||
        price === null ||
        price === undefined ||
        Number.isNaN(Number(price)) ||
        Number(price) <= 0
    ) {
        return "Giá vé phải lớn hơn 0.";
    }

    return null;
}

function validateNewTicketStatus(status) {

    if (status !== "Booked") {
        return "Khi tạo vé, trạng thái phải là Booked.";
    }

    return null;
}

async function getTicketsByRunID(req, res) {

    try {

        const runID = Number(req.params.runID);

        if (!Number.isInteger(runID)) {
            return res.status(400).json({
                error: "RunID không hợp lệ."
            });
        }

        const tickets =
            await ticketService.getTicketsByRunID(runID);

        res.json(tickets);

    } catch (err) {

        res.status(400).json({
            error: err.message
        });

    }
}

async function getSeatsByRunID(req, res) {

    try {

        const runID = Number(req.params.runID);

        if (!Number.isInteger(runID)) {
            return res.status(400).json({
                error: "RunID không hợp lệ."
            });
        }

        const result =
            await ticketService.getSeatsByRunID(runID);

        return res.json(result);

    } catch (err) {

        return res.status(400).json({
            error: err.message
        });

    }
}

async function getTicketsByScheduleID(req, res) {

    try {

        const scheduleID = Number(req.params.scheduleID);

        if (!Number.isInteger(scheduleID)) {
            return res.status(400).json({
                error: "ScheduleID không hợp lệ."
            });
        }

        const tickets =
            await ticketService.getTicketsByScheduleID(scheduleID);

        return res.json(tickets);

    } catch (err) {

        return res.status(400).json({
            error: err.message
        });

    }
}

async function getTicketStatisticsByRunID(req, res) {
    try {
        const runID = Number(req.params.runID);

        if (!Number.isInteger(runID)) {
            return res.status(400).json({
                error: "RunID không hợp lệ."
            });
        }

        const statistics =
            await ticketService.getTicketStatisticsByRunID(runID);

        return res.json(statistics);

    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
}

async function getTicketStatisticsByScheduleID(req, res) {

    try {

        const scheduleID = Number(req.params.scheduleID);

        if (!Number.isInteger(scheduleID)) {
            return res.status(400).json({
                error: "ScheduleID không hợp lệ."
            });
        }

        const statistics =
            await ticketService.getTicketStatisticsByScheduleID(scheduleID);

        return res.json(statistics);

    } catch (err) {

        return res.status(400).json({
            error: err.message
        });

    }
}

async function searchTicketsByPassengerName(req, res) {
    try {
        const { passengerName } = req.query;

        if (!passengerName || passengerName.trim() === "") {
            return res.status(400).json({
                error: "Vui lòng nhập tên hành khách."
            });
        }

        const tickets =
            await ticketService.searchTicketsByPassengerName(
                passengerName.trim()
            );

        return res.json(tickets);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}

async function getTicketsByStatus(req, res) {
    try {
        const { status } = req.params;

        const validStatuses = ["Booked", "Used", "Cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: "Trạng thái vé không hợp lệ."
            });
        }

        const tickets = await ticketService.getTicketsByStatus(status);

        return res.json(tickets);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}

async function addTicket(req, res) {
    try {

        const { scheduleID, passengerName, seatNumber, price, status } = req.body;

        const validationError = validateTicketData(
            scheduleID,
            passengerName,
            seatNumber,
            price,
        );

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const statusError = validateNewTicketStatus(status);

if (statusError) {
    return res.status(400).json({
        error: statusError
    });
}

        // ==========================
        // 1. Kiểm tra sức chứa
        // ==========================

        await ticketService.checkCapacity(scheduleID);

        // ==========================
        // 2. Kiểm tra ghế
        // ==========================

        const seatExists =
            await ticketService.checkSeatAvailable(
                scheduleID,
                seatNumber
            );

            if (seatExists) {

                return res.status(400).json({
                    error: "Số ghế này đã được đặt cho lịch chạy."
                });

            }

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

        res.status(400).json({
            error: err.message
        });

    }
}

async function updateTicket(req, res) {

    try {

        const id = Number(req.params.id);

        const {
            scheduleID,
            passengerName,
            seatNumber,
            price,
            status
        } = req.body;

        const validationError = validateTicketData(
            scheduleID,
            passengerName,
            seatNumber,
            price,
            status
        );

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        if (!Number.isInteger(id)) {

            return res.status(400).json({
                error: "TicketID không hợp lệ."
            });

        }

        const seatExists =
            await ticketService.checkSeatAvailable(
                scheduleID,
                seatNumber,
                id
            );

        await ticketService.checkCapacity(
            scheduleID,
            id
        );

        if (seatExists) {

            return res.status(400).json({
                error: "Số ghế này đã được đặt cho lịch chạy."
            });

        }

        await ticketService.checkTicketStatusChange(
            id,
            status
        );

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

    async function cancelTicket(req, res) {

    try {

        const { id } = req.params;

        await ticketService.cancelTicket(id);

        res.json({
            message: "Hủy vé thành công!"
        });

    } catch (err) {

        res.status(400).json({
            error: err.message
        });

    }

}

module.exports = {
    getTickets,
    addTicket,
    updateTicket,
    cancelTicket,
    getTicketsByRunID,
    getSeatsByRunID,
    getTicketsByScheduleID,
    getTicketStatisticsByRunID,
    getTicketStatisticsByScheduleID,
    searchTicketsByPassengerName,
    getTicketsByStatus
};