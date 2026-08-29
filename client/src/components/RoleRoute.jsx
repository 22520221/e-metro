import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRoles, children }) {

    const { user } = useAuth();


    // Chưa đăng nhập
    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // Không có quyền
    if (!allowedRoles.includes(user.Role)) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // Có quyền
    return children;

}

export default RoleRoute;