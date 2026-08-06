const API_URL = "http://localhost:3000/api/tickets";

async function getTickets() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách vé");
    }

    return await response.json();
}

async function addTicket(scheduleID, passengerName, seatNumber, price, status) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            scheduleID, 
            passengerName, 
            seatNumber, 
            price, 
            status
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Thêm vé thất bại");
    }

    return await response.json();
}

async function updateTicket(id, scheduleID, passengerName, seatNumber, price, status) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            scheduleID, 
            passengerName, 
            seatNumber, 
            price, 
            status
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật vé thất bại");
    }

    return await response.json();
}

async function deleteTicket(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Xóa vé thất bại");
    }

    return await response.json();
}

export {
    getTickets,
    addTicket,
    updateTicket,
    deleteTicket,
};