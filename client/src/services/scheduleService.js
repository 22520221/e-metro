import apiFetch from "./apiFetch";

async function getSchedules(token) {
    return apiFetch(
        "/api/schedules",
        {},
        token
    );
}

async function addSchedule(
    trainID,
    stationID,
    arrivalTime,
    departureTime,
    stopOrder,
    token
) {
    return apiFetch(
        "/api/schedules",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainID,
                stationID,
                arrivalTime,
                departureTime,
                stopOrder,
            }),
        },
        token
    );
}

async function updateSchedule(
    id,
    trainID,
    stationID,
    arrivalTime,
    departureTime,
    stopOrder,
    token
) {
    return apiFetch(
        `/api/schedules/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainID,
                stationID,
                arrivalTime,
                departureTime,
                stopOrder,
            }),
        },
        token
    );
}

async function deleteSchedule(id, token) {
    return apiFetch(
        `/api/schedules/${id}`,
        {
            method: "DELETE",
        },
        token
    );
}

export {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
};