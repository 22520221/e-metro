import { useState, useEffect } from "react";

import LineForm from "../components/LineForm";
import LineTable from "../components/LineTable";

import { getLines,
        addLine,
        updateLine,
        deleteLine
 } from "../services/lineService";

 import "../styles/LinePage.css";

function LinePage() {

// ==========================
// 1. State
// ==========================

const [lines, setLines] = useState([]);
const [lineName, setLineName] = useState("");
const [lineColor, setLineColor] = useState("");
const [editingId, setEditingId] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

// =========================
// // 2. useEffect
// ==========================

    useEffect(() => {

        loadLines();

    }, []);


// ==========================
// 3. CRUD Functions
// ==========================
    async function loadLines() {

    setIsLoading(true);

    try {

        const data = await getLines();

        setLines(data);

    } catch (err) {

        console.error(err);

        setError(err.message);

    } finally {

        setIsLoading(false);

    }
}

    function validateLine() {

    if (!lineName.trim()) {
        return "Tên tuyến không được để trống.";
    }

    if (!lineColor.trim()) {
        return "Màu tuyến không được để trống.";
    }

    if (lineName.trim().length < 2) {   
        return "Tên tuyến phải có ít nhất 2 ký tự.";
    }

    if (lineName.trim().length > 100) {
        return "Tên tuyến không được vượt quá 100 ký tự.";
    }

    if (lineColor.trim().length > 50) {
        return "Màu tuyến không được vượt quá 50 ký tự.";
    }

    return "";
}

async function handleAddLine() {

        const validationError = validateLine();

        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await addLine(
                lineName.trim(),
                lineColor.trim()
            );

            alert(result.message);

            await loadLines();

            setLineName("");
            setLineColor("");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

function handleEdit(line) {

    setEditingId(line.LineID);

    setLineName(line.LineName);

    setLineColor(line.LineColor);

}

    async function handleUpdateLine() {

        const validationError = validateLine();

        if (validationError) {
            setError(validationError);
            return;
        }

        if (editingId === null) {
            setError("Không xác định được tuyến cần cập nhật.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await updateLine(
                editingId,
                lineName,
                lineColor
            );

            alert(result.message);

            await loadLines();

            setLineName("");
            setLineColor("");

            setEditingId(null);

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function handleDeleteLine(id) {

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa tuyến này?"
        );

        if (!confirmDelete) {
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await deleteLine(id);

            alert(result.message);

            await loadLines();

        } catch (err) {

            setError(err.message);

        }

        finally {

            setIsLoading(false);

        }

    }

// ==========================
// 4. search sort
// ==========================

    function handleSearchChange(value) {
        setSearchTerm(value);
        setCurrentPage(1);
    }

    function handleSortChange(value) {
        setSortOrder(value);
        setCurrentPage(1);
    }

    const filteredLines = lines
    .filter((line) =>
        line.LineName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {

        if (sortOrder === "asc") {
            return a.LineName.localeCompare(b.LineName);
        }

        return b.LineName.localeCompare(a.LineName);
    });

// ==========================
// 3. pagination
// ==========================

    const totalPages = Math.max(
        1,
        Math.ceil(filteredLines.length / itemsPerPage)
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentLines = filteredLines.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    function handleNextPage() {

        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }

    }

    function handlePreviousPage() {

        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

    }

// ==========================
// 6. return
// ==========================

return (
        <div>

            <h1>Quản lý tuyến Metro</h1>

            {
                error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )
            }

            <LineForm
                lineName={lineName}
                setLineName={setLineName}

                lineColor={lineColor}
                setLineColor={setLineColor}

                handleAddLine={handleAddLine}
                handleUpdateLine={handleUpdateLine}

                searchTerm={searchTerm}
                sortOrder={sortOrder}

                handleSearchChange={handleSearchChange}
                handleSortChange={handleSortChange}


                editingId={editingId}
                isLoading={isLoading}
            />

            <LineTable
                lines={currentLines}

                currentPage={currentPage}
                totalPages={totalPages}

                handleEdit={handleEdit}
                handleDeleteLine={handleDeleteLine}

                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />

        </div>
        );

}





export default LinePage;