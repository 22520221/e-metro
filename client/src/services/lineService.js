import apiFetch from "./apiFetch";

async function getLines(token) {
    return apiFetch(
        "/api/lines",
        {},
        token
    );
}

async function addLine(
    LineName,
    LineColor,
    token
) {
    return apiFetch(
        "/api/lines",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lineName: LineName,
                lineColor: LineColor,
            }),
        },
        token
    );
}

async function updateLine(
    id,
    LineName,
    LineColor,
    token
) {
    return apiFetch(
        `/api/lines/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lineName: LineName,
                lineColor: LineColor,
            }),
        },
        token
    );
}

async function deleteLine(id, token) {
    return apiFetch(
        `/api/lines/${id}`,
        {
            method: "DELETE",
        },
        token
    );
}

export {
    getLines,
    addLine,
    updateLine,
    deleteLine,
};