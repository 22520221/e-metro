import { useEffect, useState } from "react";

import {
    getDashboardStats,
    getTicketStats,
    getRevenue,
    getRevenueByDate
} from "../services/dashboardService";

import TicketStatusChart from "../components/TicketStatusChart";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "../styles/DashboardPage.css";

function DashboardPage() {

    // ==========================
    // 1. State
    // ==========================

    const [stats, setStats] = useState(null);

    const [ticketStats, setTicketStats] = useState([]);

    const [revenue, setRevenue] = useState(0);

    const [revenueByDate, setRevenueByDate] = useState([]);

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    // ==========================
    // 2. useEffect
    // ==========================

    useEffect(() => {

        loadDashboard();

    }, []);


    // ==========================
    // 3. Load Dashboard
    // ==========================

    async function loadDashboard() {

        setIsLoading(true);
        setError("");

        try {

            const data = await getDashboardStats();

            setStats(data);


            const ticketData = await getTicketStats();

            setTicketStats(ticketData);


            const revenueData = await getRevenue();

            setRevenue(revenueData.TotalRevenue);


            const revenueByDateData = await getRevenueByDate();

            setRevenueByDate(revenueByDateData);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }


    // ==========================
    // 4. Revenue Chart Data
    // ==========================

    const revenueChartData = revenueByDate.map((item) => ({

        date: new Date(item.RevenueDate)
            .toLocaleDateString("vi-VN"),

        revenue: Number(item.TotalRevenue)

    }));


    // ==========================
    // 5. Loading
    // ==========================

    if (isLoading) {

        return (
            <div className="dashboard-loading">
                Đang tải dữ liệu...
            </div>
        );

    }


    // ==========================
    // 6. Return
    // ==========================

    return (

        <div className="dashboard-page">

            <h1 className="dashboard-title">
                Dashboard Metro
            </h1>


            {/* Error */}

            {error && (

                <div className="dashboard-error">
                    {error}
                </div>

            )}


            {/* ==========================
                OVERVIEW CARDS
            ========================== */}

            {stats && (

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h2>{stats.TotalLines}</h2>
                        <p>Tổng số tuyến</p>
                    </div>


                    <div className="dashboard-card">
                        <h2>{stats.TotalTrains}</h2>
                        <p>Tổng số tàu</p>
                    </div>


                    <div className="dashboard-card">
                        <h2>{stats.TotalStations}</h2>
                        <p>Tổng số ga</p>
                    </div>


                    <div className="dashboard-card">
                        <h2>{stats.TotalSchedules}</h2>
                        <p>Tổng số lịch chạy</p>
                    </div>


                    <div className="dashboard-card">
                        <h2>{stats.TotalTickets}</h2>
                        <p>Tổng số vé</p>
                    </div>


                    <div className="dashboard-card revenue-card">

                        <h2>
                            {Number(revenue)
                                .toLocaleString("vi-VN")} ₫
                        </h2>

                        <p>Tổng doanh thu</p>

                    </div>

                </div>

            )}


            {/* ==========================
                TICKET STATUS
            ========================== */}

            <section className="dashboard-section">

                <h2>
                    Thống kê vé theo trạng thái
                </h2>


                <div className="ticket-status-cards">

                    {ticketStats.map((item) => (

                        <div
                            className="ticket-status-card"
                            key={item.Status}
                        >

                            <h2>
                                {item.Total}
                            </h2>

                            <p>
                                {item.Status}
                            </p>

                        </div>

                    ))}

                </div>


                <div className="chart-container">

                    <TicketStatusChart
                        ticketStats={ticketStats}
                    />

                </div>

            </section>


            {/* ==========================
                REVENUE BY DATE
            ========================== */}

            <section className="dashboard-section">

                <h2>
                    Doanh thu theo ngày
                </h2>


                <div className="chart-container revenue-chart">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={revenueChartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 10,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={(value) =>
                                    `${Number(value)
                                        .toLocaleString("vi-VN")} ₫`
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                name="Doanh thu"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 7 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </section>

        </div>

    );

}

export default DashboardPage;

