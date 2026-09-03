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

export {
    getUsers,
    createUser
};