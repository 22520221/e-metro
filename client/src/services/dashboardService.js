const API_URL = "http://localhost:3000/api/dashboard";

async function getDashboardStats() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(
            error.error || "Không thể lấy dữ liệu Dashboard"
        );
    }

    return await response.json();
}

async function getTicketStats() {
    const response = await fetch(
        "http://localhost:3000/api/dashboard/tickets"
    );

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.error || "Không thể lấy thống kê vé"
        );
    }

    return await response.json();
}

async function getRevenue() {

    const response = await fetch(
        "http://localhost:3000/api/dashboard/revenue"
    );

    if (!response.ok) {
        throw new Error("Không thể lấy doanh thu");
    }

    return await response.json();
}

async function getRevenueByDate() {

    const response = await fetch(
        "http://localhost:3000/api/dashboard/revenue-by-date"
    );

    if (!response.ok) {
        throw new Error(
            "Không thể lấy doanh thu theo ngày"
        );
    }

    return await response.json();
}

export {
    getDashboardStats,
    getTicketStats,
    getRevenue,
    getRevenueByDate
};