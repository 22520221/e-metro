import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <div className="navbar-brand">
                e-Metro
            </div>


            <div className="navbar-links">

                {/* HOME - TẤT CẢ ROLE */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    Home
                </NavLink>


                {/* ADMIN */}
                {user?.Role === "Admin" && (

                    <>
                        <NavLink
                            to="/stations"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar-link active"
                                    : "navbar-link"
                            }
                        >
                            Stations
                        </NavLink>


                        <NavLink
                            to="/trains"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar-link active"
                                    : "navbar-link"
                            }
                        >
                            Trains
                        </NavLink>


                        <NavLink
                            to="/lines"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar-link active"
                                    : "navbar-link"
                            }
                        >
                            Lines
                        </NavLink>

                    </>

                )}


                {/* ADMIN + STAFF */}
                {(user?.Role === "Admin" ||
                    user?.Role === "Staff") && (

                    <>

                        <NavLink
                            to="/schedules"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar-link active"
                                    : "navbar-link"
                            }
                        >
                            Schedules
                        </NavLink>


                        <NavLink
                            to="/tickets"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar-link active"
                                    : "navbar-link"
                            }
                        >
                            Tickets
                        </NavLink>

                    </>

                )}


                {/* ADMIN + STAFF */}
                {(user?.Role === "Admin" ||
                    user?.Role === "Staff") && (

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "navbar-link active"
                                : "navbar-link"
                        }
                    >
                        Dashboard
                    </NavLink>

                )}

            </div>

            {user?.Role === "Admin" && (

    <NavLink
        to="/users"
        className={({ isActive }) =>
            isActive
                ? "navbar-link active"
                : "navbar-link"
        }
    >
        Users
    </NavLink>

)}


            {/* USER INFO */}

            {user && (

                <div className="navbar-user">

                    <span className="navbar-user-info">

                        {user.Username}
                        {" - "}
                        {user.Role}

                    </span>


                    <button
                        className="navbar-logout"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </button>

                </div>

            )}

        </nav>

    );

}

export default Navbar;
