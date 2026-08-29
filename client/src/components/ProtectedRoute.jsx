import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {

    const {
        isAuthenticated
    } = useAuth();

    const location = useLocation();


    // Chưa đăng nhập
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location
                }}
            />
        );

    }


    // Đã đăng nhập
    return <Outlet />;

}

export default ProtectedRoute;