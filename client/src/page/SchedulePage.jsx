import { useEffect, useState } from "react";    

import ScheduleForm from "../components/ScheduleForm";
import ScheduleTable from "../components/ScheduleTable";

import {
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule
} from "../services/scheduleService";

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

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

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

        if (new Date(departureTime) <= new Date(arrivalTime)) {
            alert("Giờ đi phải sau giờ đến.");
            return;
        }

        const order = Number(stopOrder);

        if (!Number.isInteger(order) || order <= 0) {
            alert("Thứ tự dừng phải là số nguyên lớn hơn 0.");
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

            console.log("arrivalTime:", arrivalTime);
            console.log("departureTime:", departureTime);
            console.log(
                "arrival Date:",
                new Date(arrivalTime).toISOString()
            );
            console.log(
                "departure Date:",
                new Date(departureTime).toISOString()
            );

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
            setArrivalTime("");
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

        if (new Date(departureTime) <= new Date(arrivalTime)) {
            alert("Giờ đi phải sau giờ đến.");
            return;
        }

        const order = Number(stopOrder);

        if (!Number.isInteger(order) || order <= 0) {
            alert("Thứ tự dừng phải là số nguyên lớn hơn 0.");
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

    const filteredSchedules = schedules
    .filter((schedule) =>
        schedule.TrainName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        schedule.StationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {

        if (sortOrder === "asc") {
            return a.ScheduleID - b.ScheduleID;
        }

        return b.ScheduleID - a.ScheduleID;
    });

const totalPages = Math.max(
    1,
    Math.ceil(filteredSchedules.length / itemsPerPage)
);

const startIndex =
    (currentPage - 1) * itemsPerPage;

const endIndex =
    startIndex + itemsPerPage;

const currentSchedules =
    filteredSchedules.slice(
        startIndex,
        endIndex
    );

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

                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}

                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
            />

            <ScheduleTable
                schedules={currentSchedules}

                handleEdit={handleEdit}
                handleDeleteSchedule={handleDeleteSchedule}

                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}

                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default SchedulePage;