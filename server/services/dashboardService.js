const { sql, config } = require("../config/db");

async function getDashboardStats() {
    await sql.connect(config);

    const result = await sql.query`
        SELECT
            (SELECT COUNT(*) FROM Line) AS TotalLines,
            (SELECT COUNT(*) FROM Train) AS TotalTrains,
            (SELECT COUNT(*) FROM Station) AS TotalStations,
            (SELECT COUNT(*) FROM Schedule) AS TotalSchedules,
            (SELECT COUNT(*) FROM Ticket) AS TotalTickets
    `;

    return result.recordset[0];
}

async function getTicketStats() {
    await sql.connect(config);

    const result = await sql.query`
        SELECT
            Status,
            COUNT(*) AS Total
        FROM Ticket
        GROUP BY Status
        ORDER BY Status
    `;

    return result.recordset;
}

async function getRevenue() {

    await sql.connect(config);

    const result = await sql.query`
        SELECT
            SUM(Price) AS TotalRevenue
        FROM Ticket
        WHERE Status <> 'Cancelled'
    `;

    return result.recordset[0];
}

async function getRevenueByDate() {

    await sql.connect(config);

    const result = await sql.query`
        SELECT
            CAST(CreatedAt AS DATE) AS RevenueDate,
            SUM(Price) AS TotalRevenue
        FROM Ticket
        WHERE Status <> 'Cancelled'
        GROUP BY CAST(CreatedAt AS DATE)
        ORDER BY CAST(CreatedAt AS DATE)
    `;

    return result.recordset;
}

module.exports = {
    getDashboardStats,
    getTicketStats,
    getRevenue,
    getRevenueByDate
};