import apiFetch from "./apiFetch";

async function getStations(token) {
    return apiFetch(
        "/api/stations",
        {},
        token
    );
}

async function addStation(
    stationName,
    address,
    lineId,
    token
) {
    return apiFetch(
        "/api/stations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stationName,
                address,
                lineId,
            }),
        },
        token
    );
}

async function updateStation(
    id,
    stationName,
    address,
    lineId,
    token
) {
    return apiFetch(
        `/api/stations/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stationName,
                address,
                lineId,
            }),
        },
        token
    );
}

async function deleteStation(id, token) {
    return apiFetch(
        `/api/stations/${id}`,
        {
            method: "DELETE",
        },
        token
    );
}

export {
    getStations,
    addStation,
    updateStation,
    deleteStation,
};