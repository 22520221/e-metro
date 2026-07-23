import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./page/HomePage";
import StationPage from "./page/StationPage";
import TrainPage from "./page/TrainPage";

import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
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
            </Routes>
        </>
    );
}

export default App;