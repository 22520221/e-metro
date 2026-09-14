import apiFetch from "./apiFetch";

async function getTrains(token) {
    return apiFetch(
        "/api/trains",
        {},
        token
    );
}

async function addTrain(
    trainName,
    capacity,
    company,
    status,
    lineId,
    token
) {
    return apiFetch(
        "/api/trains",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainName,
                capacity,
                company,
                status,
                lineId,
            }),
        },
        token
    );
}

async function updateTrain(
    id,
    trainName,
    capacity,
    company,
    status,
    lineId,
    token
) {
    return apiFetch(
        `/api/trains/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainName,
                capacity,
                company,
                status,
                lineId,
            }),
        },
        token
    );
}

async function deleteTrain(id, token) {
    return apiFetch(
        `/api/trains/${id}`,
        {
            method: "DELETE",
        },
        token
    );
}

export {
    getTrains,
    addTrain,
    updateTrain,
    deleteTrain,
};