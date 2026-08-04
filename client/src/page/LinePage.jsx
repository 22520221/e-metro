import { useState, useEffect } from "react";

import LineForm from "../components/LineForm";
import LineTable from "../components/LineTable";

import { getLines,
        addLine,
        updateLine,
        deleteLine
 } from "../services/lineService";

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

async function handleAddLine() {

        if (!lineName.trim() || !lineColor.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin.");
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

        if (!lineName.trim() || !lineColor.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin.");
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

                editingId={editingId}

                isLoading={isLoading}
            />

            <LineTable
                lines={lines}

                currentPage={currentPage}
                
                handleEdit={handleEdit}

                handleDeleteLine={handleDeleteLine}
            />

        </div>
        );

}





export default LinePage;