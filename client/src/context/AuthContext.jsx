import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    // =========================================
    // LOAD USER FROM LOCAL STORAGE
    // =========================================

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("metro_user");

        if (!savedUser) {
            return null;
        }

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            localStorage.removeItem("metro_user");

            return null;

        }

    });


    // =========================================
    // LOGIN
    // =========================================

    const login = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "metro_user",
            JSON.stringify(userData)
        );

    };


    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        setUser(null);

        localStorage.removeItem(
            "metro_user"
        );

    };


    // =========================================
    // AUTH STATE
    // =========================================

    const isAuthenticated =
        user !== null;


    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// =========================================
// USE AUTH
// =========================================

export function useAuth() {

    return useContext(AuthContext);

}