import apiFetch from "./apiFetch";

async function getTickets(token) {
    return apiFetch(
        "/api/tickets",
        {},
        token
    );
}

async function addTicket(
    scheduleID,
    passengerName,
    seatNumber,
    price,
    status,
    token
) {
    return apiFetch(
        "/api/tickets",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                scheduleID,
                passengerName,
                seatNumber,
                price,
                status,
            }),
        },
        token
    );
}

async function updateTicket(
    id,
    scheduleID,
    passengerName,
    seatNumber,
    price,
    status,
    token
) {
    return apiFetch(
        `/api/tickets/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                scheduleID,
                passengerName,
                seatNumber,
                price,
                status,
            }),
        },
        token
    );
}

async function cancelTicket(id, token) {
    return apiFetch(
        `/api/tickets/${id}/cancel`,
        {
            method: "PUT",
        },
        token
    );
}

export {
    getTickets,
    addTicket,
    updateTicket,
    cancelTicket,
};