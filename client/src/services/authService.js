const API_URL = "http://localhost:3000/api/auth";


// =========================================
// LOGIN
// =========================================

async function login(username, password) {

    const response = await fetch(`${API_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });


    const data = await response.json();


    // Backend trả lỗi
    if (!response.ok) {

        throw new Error(
            data.error || "Đăng nhập thất bại."
        );

    }


    return data;
}


export {
    login
};