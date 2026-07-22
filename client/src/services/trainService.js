const API_URL = "http://localhost:3000/api/trains";

async function getTrains() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách tàu");
    }

    return await response.json();
}

async function addTrain(
    trainName,
    capacity,
    company,
    status
) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            trainName,
            capacity,
            company,
            status,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Thêm tàu thất bại");
    }

    return await response.json();
}

async function updateTrain(
    id,
    trainName,
    capacity,
    company,
    status
) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            trainName,
            capacity,
            company,
            status,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật tàu thất bại");
    }

    return await response.json();
}

async function deleteTrain(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Xóa tàu thất bại");
    }

    return await response.json();
}

export {
    getTrains,
    addTrain,
    updateTrain,
    deleteTrain,
};