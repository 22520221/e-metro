import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./page/HomePage";
import StationPage from "./page/StationPage";
import TrainPage from "./page/TrainPage";
import LinePage from "./page/LinePage";
import SchedulePage from "./page/SchedulePage";
import TicketPage from "./page/TicketPage";
import DashboardPage from "./page/DashboardPage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import UserPage from "./page/UserPage";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";


function App() {

    return (

        <Routes>

            {/* =========================================
                LOGIN
            ========================================= */}

            <Route
                path="/login"
                element={<LoginPage />}
            />


            {/* =========================================
                LAYOUT
            ========================================= */}

            <Route element={<Layout />}>

                {/* =====================================
                    LOGIN REQUIRED
                ===================================== */}

                <Route element={<ProtectedRoute />}>

                    {/* HOME - TẤT CẢ ROLE */}
                    <Route
                        path="/"
                        element={<HomePage />}
                    />


                    {/* =================================
                        ADMIN ONLY
                    ================================= */}

                    <Route
                        path="/stations"
                        element={
                            <RoleRoute allowedRoles={["Admin"]}>
                                <StationPage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="/trains"
                        element={
                            <RoleRoute allowedRoles={["Admin"]}>
                                <TrainPage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="/lines"
                        element={
                            <RoleRoute allowedRoles={["Admin"]}>
                                <LinePage />
                            </RoleRoute>
                        }
                    />


                    {/* =================================
                        ADMIN + STAFF
                    ================================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "Admin",
                                    "Staff"
                                ]}
                            >
                                <DashboardPage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="/schedules"
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "Admin",
                                    "Staff"
                                ]}
                            >
                                <SchedulePage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="/tickets"
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "Admin",
                                    "Staff"
                                ]}
                            >
                                <TicketPage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <RoleRoute allowedRoles={["Admin"]}>
                                <UserPage/>
                            </RoleRoute>
                        }
                    />


                    {/* =================================
                        NOT FOUND
                    ================================= */}

                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />

                </Route>

            </Route>

        </Routes>

    );

}

export default App;