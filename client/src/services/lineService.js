const API_URL = "http://localhost:3000/api/lines";

async function getLines() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách tuyến");
    }

    return await response.json();
}

async function addLine(LineName, LineColor) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lineName: LineName,
            lineColor: LineColor
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Thêm tuyến thất bại");
    }

    return await response.json();
}

async function updateLine(id, LineName, LineColor) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lineName: LineName,
            lineColor: LineColor,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật tuyến thất bại");
    }

    return await response.json();
}

async function deleteLine(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Xóa tuyến thất bại");
    }

    return await response.json();
}

export {
    getLines,
    addLine,
    updateLine,
    deleteLine,
};