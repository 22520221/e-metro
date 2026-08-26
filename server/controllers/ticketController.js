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
    cancelTicket
};