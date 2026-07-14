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

    const [stations, setStations] = useState([]);

    const [stationName, setStationName] = useState("");

    const [address, setAddress] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        loadStations();

    }, []);

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

        const filteredStations = stations.filter((station) =>
        station.StationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

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
                setSearchTerm={setSearchTerm}

                editingId={editingId}

                handleAddStation={handleAddStation}
                handleUpdateStation={handleUpdateStation}

                isLoading={isLoading}
            />

            <StationTable
                stations={filteredStations}

                handleEdit={handleEdit}

                handleDelete={handleDelete}
            />

        </div>
    );
}

export default App;