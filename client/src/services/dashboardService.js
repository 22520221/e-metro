import apiFetch from "./apiFetch";

async function getDashboardStats(token) {
    return apiFetch(
        "/api/dashboard",
        {},
        token
    );
}

async function getTicketStats(token) {
    return apiFetch(
        "/api/dashboard/tickets",
        {},
        token
    );
}

async function getRevenue(token) {
    return apiFetch(
        "/api/dashboard/revenue",
        {},
        token
    );
}

async function getRevenueByDate(token) {
    return apiFetch(
        "/api/dashboard/revenue-by-date",
        {},
        token
    );
}

export {
    getDashboardStats,
    getTicketStats,
    getRevenue,
    getRevenueByDate,
};