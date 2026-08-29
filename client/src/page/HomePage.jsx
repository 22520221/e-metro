import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function HomePage() {

    const { user } = useAuth();


    return (

        <div>

            <h1>e-Metro</h1>

            <p>
                Hệ thống quản lý tàu điện Metro
            </p>


            {/* =========================================
                ADMIN
            ========================================= */}

            {user?.Role === "Admin" && (

                <>
                    <Link to="/stations">
                        Quản lý Ga
                    </Link>

                    <br />
                    <br />

                    <Link to="/trains">
                        Quản lý Tàu
                    </Link>

                    <br />
                    <br />

                    <Link to="/lines">
                        Quản lý Tuyến
                    </Link>

                    <br />
                    <br />
                </>

            )}


            {/* =========================================
                ADMIN + STAFF
            ========================================= */}

            {(user?.Role === "Admin" ||
                user?.Role === "Staff") && (

                <>
                    <Link to="/schedules">
                        Quản lý Lịch
                    </Link>

                    <br />
                    <br />

                    <Link to="/tickets">
                        Quản lý Vé
                    </Link>
                </>

            )}

        </div>

    );

}

export default HomePage;