import { useEffect, useState } from "react";    

import ScheduleForm from "../components/ScheduleForm";
import ScheduleTable from "../components/ScheduleTable";

import {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule
} from "../services/ScheduleService";

import { getTrains } from "../services/trainService";

import { getStations } from "../services/stationService";

function SchedulePage(){
// ==========================
// 1. State
// ==========================
    const [trains, setTrains] = useState([]);

    const [schedules, setSchedules] = useState([]);
    
    const [stations, setStations] = useState([]);

    const [trainId, setTrainId] = useState("");

    const [stationId, setStationId] = useState("");
    
    const [arrivalTime, setaArrivalTime] = useState("");
    
    const [departureTime, setDepartureTime] = useState("");
    
    const [stopOrder, setStopOrder] = useState("");

    const [editingId, setEditingId] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState("");

// =========================
// // 2. useEffect
// ==========================

    useEffect(() => {

        loadSchedules();
        loadTrains();
        loadStations();

    }, []);

// ==========================
// 3. CRUD Functions
// ==========================

    async function loadSchedules() {
    try {

        const data = await getSchedules();

        setSchedules(data);

    } catch (err) {

        console.error(err);

        setError(err.message);

    }
}

    async function loadTrains() {

    try {

        const data = await getTrains();

        setTrains(data);

    } catch (err) {

        console.error(err);

    }

}

async function loadStations() {

    try {

        const data = await getStations();

        setStations(data);

    } catch (err) {

        console.error(err);

    }

}

    async function handleAddSchedule() {

        if (!trainId || !stationId || !arrivalTime || !departureTime || !stopOrder) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            console.log({
                trainId,
                stationId,
                arrivalTime,
                departureTime,
                stopOrder
            });

            const result = await addSchedule(
                trainId, 
                stationId, 
                arrivalTime, 
                departureTime, 
                stopOrder
            );

            alert(result.message);

            await loadSchedules();

            setTrainId("");
            setStationId("");
            setaArrivalTime("");
            setDepartureTime("");
            setStopOrder("");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function handleUpdateSchedule() {

        if (!trainId || !stationId || !arrivalTime || !departureTime || !stopOrder) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            const result = await updateSchedule(
                editingId,
                trainId, 
                stationId, 
                arrivalTime, 
                departureTime, 
                stopOrder
            );

            alert(result.message);

            await loadSchedules();

            setEditingId(null);
            setTrainId("");
            setStationId("");
            setaArrivalTime("");
            setDepartureTime("");
            setStopOrder("");
        } catch (err) {

            setError(err.message);

        } finally {
            setIsLoading(false);
        }

    }

    async function handleDeleteSchedule(id) {

    const confirmDelete = window.confirm(
        "Bạn có chắc muốn xóa lịch này?"
    );

    if (!confirmDelete) {
        return;
    }

    setIsLoading(true);
    setError("");

    try {

        const result = await deleteSchedule(id);

        alert(result.message);

        await loadSchedules();

    } catch (err) {

        setError(err.message);

    } finally {

        setIsLoading(false);

    }

}

function handleEdit(schedule) {

    setEditingId(schedule.ScheduleID);

    setTrainId(schedule.TrainID);

    setStationId(schedule.StationID);

    setaArrivalTime(schedule.ArrivalTime);

    setDepartureTime(schedule.DepartureTime);

    setStopOrder(schedule.StopOrder);
    
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


    return (
        <div>

            <h1>Danh sách lịch chạy Metro</h1>

            {
                error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )
            }
            <ScheduleForm
                trains={trains}
                stations={stations}

                trainId={trainId}
                setTrainId={setTrainId}

                stationId={stationId}
                setStationId={setStationId}

                arrivalTime={arrivalTime}
                setArrivalTime={setaArrivalTime}

                departureTime={departureTime}
                setDepartureTime={setDepartureTime}

                stopOrder={stopOrder}
                setStopOrder={setStopOrder}

                editingId={editingId}

                handleAddSchedule={handleAddSchedule}
                handleUpdateSchedule={handleUpdateSchedule}

                isLoading={isLoading}
            />

            <ScheduleTable
                schedules={schedules}

                handleEdit={handleEdit}
                handleDeleteSchedule={handleDeleteSchedule}
            />
        </div>
    );
}

export default SchedulePage;