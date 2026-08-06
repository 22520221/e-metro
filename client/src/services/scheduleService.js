const API_URL = "http://localhost:3000/api/schedules";

async function getSchedules() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách lịch");
    }

    return await response.json();
}

async function addSchedule(trainID, stationID, arrivalTime, departureTime, stopOrder) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            trainID, 
            stationID, 
            arrivalTime, 
            departureTime, 
            stopOrder
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Thêm lịch thất bại");
    }

    return await response.json();
}

async function updateSchedule(id, trainID, stationID, arrivalTime, departureTime, stopOrder) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            trainID, 
            stationID, 
            arrivalTime, 
            departureTime, 
            stopOrder
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật lịch thất bại");
    }

    return await response.json();
}

async function deleteSchedule(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Xóa lịch thất bại");
    }

    return await response.json();
}

export {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
};