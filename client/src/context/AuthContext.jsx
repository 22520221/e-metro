import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (loginData) => {
        setUser(loginData.user);
        setToken(loginData.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const isAuthenticated = user !== null && token !== null;

    console.log("AUTH CONTEXT:", {
    user,
    token,
    isAuthenticated
});

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}