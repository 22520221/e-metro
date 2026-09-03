const API_BASE_URL = "http://localhost:3000";

async function apiFetch(url, options = {}, token = null) {
    const headers = {
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${url}`,
        {
            ...options,
            headers,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Có lỗi xảy ra."
        );
    }

    return data;
}

export default apiFetch;