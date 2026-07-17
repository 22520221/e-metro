import { useEffect, useState } from "react";

import StationForm from "./components/StationForm";
import StationTable from "./components/StationTable";

import {
    getStations,
    addStation,
    updateStation,
    deleteStation
} from "./services/stationService";

function App() {

// ==========================
// 1. State
// ==========================

    const [stations, setStations] = useState([]);

    const [stationName, setStationName] = useState("");

    const [address, setAddress] = useState("");

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

        loadStations();

    }, []);

// ==========================
// 3. CRUD Functions
// ==========================

    async function loadStations() {

        try {

            const data = await getStations();

            setStations(data);

        } catch (err) {

            console.error(err);

            setError(err.message);

        }

    }

    async function handleAddStation() {

        if (!stationName || !address) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await addStation(
                stationName,
                address
            );

            alert(result.message);

            await loadStations();

            setStationName("");
            setAddress("");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    function handleEdit(station) {

        setEditingId(station.StationID);

        setStationName(station.StationName);

        setAddress(station.Address);

    }

    async function handleUpdateStation() {

        if (!stationName || !address) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await updateStation(
                editingId,
                stationName,
                address
            );

            alert(result.message);

            await loadStations();

            setStationName("");
            setAddress("");

            setEditingId(null);

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa ga này?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const result = await deleteStation(id);

            alert(result.message);

            await loadStations();

        } catch (err) {

            setError(err.message);

        }

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

        const filteredStations = stations
    .filter((station) =>
        station.StationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {

        if (sortOrder === "asc") {

            return a.StationName.localeCompare(
                b.StationName
            );

        }

        return b.StationName.localeCompare(
            a.StationName
        );

    });

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentStations = filteredStations.slice(
        startIndex,
        endIndex
    );

    const totalPages =
    Math.ceil(
        filteredStations.length /
        itemsPerPage
    );

 // ==========================
// 6. return
// ==========================

    return (
        <div>

            <h1>Danh sách ga Metro</h1>

            {
                error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )
            }

            <StationForm
                stationName={stationName}
                setStationName={setStationName}

                address={address}
                setAddress={setAddress}

                searchTerm={searchTerm}

                sortOrder={sortOrder}

                handleSearchChange={handleSearchChange}

                handleSortChange={handleSortChange}

                editingId={editingId}

                handleAddStation={handleAddStation}
                handleUpdateStation={handleUpdateStation}

                isLoading={isLoading}
            />

            <StationTable
                stations={currentStations}
                currentPage={currentPage}

                totalPages={totalPages} 

                handleEdit={handleEdit}
                handleDelete={handleDelete}

                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}

                currentPage={currentPage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default App;