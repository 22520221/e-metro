const API_URL = "http://localhost:3000/api/stations";

async function getStations() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách ga");
    }

    return await response.json();
}

async function addStation(stationName, address) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stationName,
            address,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Thêm ga thất bại");
    }

    return await response.json();
}

async function updateStation(id, stationName, address) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stationName,
            address,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật ga thất bại");
    }

    return await response.json();
}

async function deleteStation(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Xóa ga thất bại");
    }

    return await response.json();
}

export {
    getStations,
    addStation,
    updateStation,
    deleteStation,
};