import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./page/HomePage";
import StationPage from "./page/StationPage";
import TrainPage from "./page/TrainPage";
import LinePage from "./page/LinePage";
import SchedulePage from "./page/SchedulePage";
import TicketPage from "./page/TicketPage";
import NotFoundPage from "./page/NotFoundPage";

import Layout from "./layouts/Layout";

function App() {
    return (
        <Routes>

            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/stations"
                    element={<StationPage />}
                />

                <Route
                    path="/trains"
                    element={<TrainPage />}
                />

                <Route
                    path="/lines"
                    element={<LinePage />}    
                />

                <Route 
                    path="/schedules" 
                    element={<SchedulePage />} 
                />

                <Route 
                    path="/tickets" 
                    element={<TicketPage />} 
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Route>

        </Routes>
    );
}

export default App;