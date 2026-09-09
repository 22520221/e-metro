import apiFetch from "./apiFetch";

async function getUsers(token) {
    return apiFetch(
        "/api/users",
        {},
        token
    );
}

async function createUser(
    username,
    password,
    fullName,
    email,
    role,
    token
) {
    return apiFetch(
        "/api/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                fullName,
                email,
                role
            })
        },
        token
    );
}

async function updateUser(
    userId,
    username,
    fullName,
    email,
    role,
    token
) {
    return apiFetch(
        `/api/users/${userId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                fullName,
                email,
                role
            })
        },
        token
    );
}

async function updateUserStatus(userId, status, token) {
    return apiFetch(
        `/api/users/${userId}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        },
        token
    );
}

export {
    getUsers,
    createUser,
    updateUser,
    updateUserStatus
};