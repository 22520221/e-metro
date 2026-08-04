import { useEffect, useState } from "react";    

import TrainForm from "../components/TrainForm";
import TrainTable from "../components/TrainTable";

import {
    getTrains,
    addTrain,
    updateTrain,
    deleteTrain
} from "../services/trainService";

import { getLines } from "../services/lineService";

function TrainPage(){
// ==========================
// 1. State
// ==========================
    const [trains, setTrains] = useState([]);
    
    const [trainName, setTrainName] = useState("");
    
    const [capacity, setCapacity] = useState("");
    
    const [company, setCompany] = useState("");
    
    const [status, setStatus] = useState("Active");

    const [lines, setLines] = useState([]);
    const [lineId, setLineId] = useState("");
    
    const [editingId, setEditingId] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

// =========================
// // 2. useEffect
// ==========================

    useEffect(() => {

        loadTrains();
        loadLines();

    }, []);

// ==========================
// 3. CRUD Functions
// ==========================

    async function loadTrains() {
    try {

        const data = await getTrains();

        setTrains(data);

    } catch (err) {

        console.error(err);

        setError(err.message);

    }
}

    async function loadLines() {

    try {

        const data = await getLines();

        setLines(data);

    } catch (err) {

        console.error(err);

    }

}

    async function handleAddTrain() {

        if (!trainName || !company || !status || !lineId) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await addTrain(
                trainName,
                capacity,
                company,
                status,
                lineId
            );

            alert(result.message);

            await loadTrains();

            setTrainName("");
            setCompany("");
            setCapacity("");
            setStatus("Active");
            setLineId("");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function handleUpdateTrain() {

        if (!trainName || !company || !status || !lineId) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await updateTrain(
                editingId,
                trainName,
                capacity,
                company,
                status,
                lineId
            );

            alert(result.message);

            await loadTrains();

            setEditingId(null);
            setTrainName("");
            setCapacity("");
            setCompany("");
            setStatus("Active");
            setLineId("");
        } catch (err) {

            setError(err.message);

        } finally {
            setIsLoading(false);
        }

    }

    async function handleDeleteTrain(id) {

    const confirmDelete = window.confirm(
        "Bạn có chắc muốn xóa tàu này?"
    );

    if (!confirmDelete) {
        return;
    }

    setIsLoading(true);
    setError("");

    try {

        const result = await deleteTrain(id);

        alert(result.message);

        await loadTrains();

    } catch (err) {

        setError(err.message);

    } finally {

        setIsLoading(false);

    }

}

function handleEdit(train) {

    setEditingId(train.TrainID);

    setTrainName(train.TrainName);

    setCapacity(train.Capacity);

    setCompany(train.Company);

    setStatus(train.Status);

    setLineId(train.LineID);

}

// ==========================
// 4. Pagination Functions
// ==========================

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

    function handleSearchChange(value) {

    setSearchTerm(value);

    setCurrentPage(1);

}

function handleSortChange(value) {

    setSortOrder(value);

    setCurrentPage(1);

}

// ==========================
// 5. Xử lý dữ liệu
// ==========================

        const filteredTrains = trains
    .filter((train) =>
        train.TrainName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {

        if (sortOrder === "asc") {

            return a.TrainName.localeCompare(
                b.TrainName
            );

        }

        return b.TrainName.localeCompare(
            a.TrainName
        );

    });

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentTrains = filteredTrains.slice(
        startIndex,
        endIndex
    );

    const totalPages =
    Math.ceil(
        filteredTrains.length /
        itemsPerPage
    );

// ==========================
// 6. return
// ==========================
    return (
        <div>

            <h1>Danh sách tàu Metro</h1>

            {
                error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )
            }
            <TrainForm
                trainName={trainName}
                setTrainName={setTrainName}

                capacity={capacity}
                setCapacity={setCapacity}

                company={company}
                setCompany={setCompany}

                status={status}
                setStatus={setStatus}

                lines={lines}
                lineId={lineId}
                setLineId={setLineId}

                editingId={editingId}

                handleAddTrain={handleAddTrain}
                handleUpdateTrain={handleUpdateTrain}

                isLoading={isLoading}
            />

            <TrainTable
                trains={currentTrains}
                currentPage={currentPage}
                totalPages={totalPages} 

                handleEdit={handleEdit}
                handleDeleteTrain={handleDeleteTrain}

                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
        </div>
    );
}

export default TrainPage;