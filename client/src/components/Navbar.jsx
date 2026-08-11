import { NavLink } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="navbar-brand">
                e-Metro
            </div>

            <div className="navbar-links">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/stations"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Stations
                </NavLink>

                <NavLink
                    to="/trains"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Trains
                </NavLink>

                <NavLink
                    to="/lines"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Lines
                </NavLink>

                <NavLink
                    to="/schedules"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Schedules
                </NavLink>

                <NavLink
                    to="/tickets"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Tickets
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                    }
                >
                    Dashboards
                </NavLink>

            </div>

        </nav>

    );

}

export default Navbar;

