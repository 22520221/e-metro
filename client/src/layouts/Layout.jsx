import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../layouts/Layout.css";

function Layout() {

    return (

        <div className="app-layout">

            <Navbar />

            <main className="main-content">

                <Outlet />

            </main>

        </div>

    );

}

export default Layout;

