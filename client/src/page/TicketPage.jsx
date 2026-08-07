import { useState, useEffect } from "react";

import TicketForm from "../components/TicketForm";
import TicketTable from "../components/TicketTable";

import {
    getTickets,
    addTicket,
    updateTicket,
    deleteTicket,
} from "../services/ticketService";

import { getSchedules } from "../services/scheduleService";

function TicketPage() {

    // ==========================
    // 1. State
    // ==========================

    const [tickets, setTickets] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const [scheduleId, setScheduleId] = useState("");
    const [passengerName, setPassengerName] = useState("");
    const [seatNumber, setSeatNumber] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Booked");

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [editingId, setEditingId] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================
    // 2. useEffect
    // ==========================

    useEffect(() => {
        loadTickets();
        loadSchedules();
    }, []);

    // ==========================
    // 3. Load Data
    // ==========================

    async function loadTickets() {

        setIsLoading(true);

        try {

            const data = await getTickets();

            setTickets(data);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function loadSchedules() {

        try {

            const data = await getSchedules();

            setSchedules(data);

        } catch (err) {

            console.error(err);

            setError(err.message);

        }

    }

    // ==========================
    // 4. CRUD
    // ==========================

    async function handleAddTicket() {

        if (
            !scheduleId ||
            passengerName.trim() === "" ||
            seatNumber.trim() === "" ||
            price === "" ||
            !status
        ) {

            alert("Vui lòng nhập đầy đủ thông tin.");

            return;

        }

        setIsLoading(true);

        setError("");

        try {

            const result = await addTicket(
                scheduleId,
                passengerName,
                seatNumber,
                Number(price),
                status
            );

            alert(result.message);

            await loadTickets();

            setScheduleId("");
            setPassengerName("");
            setSeatNumber("");
            setPrice("");
            setStatus("Booked");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    function handleEdit(ticket) {

        setEditingId(ticket.TicketID);

        setScheduleId(ticket.ScheduleID);

        setPassengerName(ticket.PassengerName);

        setSeatNumber(ticket.SeatNumber);

        setPrice(ticket.Price);

        setStatus(ticket.Status);

    }

    async function handleUpdateTicket() {

        if (
            !scheduleId ||
            passengerName.trim() === "" ||
            seatNumber.trim() === "" ||
            price === "" ||
            !status
        ) {

            alert("Vui lòng nhập đầy đủ thông tin.");

            return;

        }

        setIsLoading(true);

        setError("");

        try {

            const result = await updateTicket(
                editingId,
                scheduleId,
                passengerName,
                seatNumber,
                Number(price),
                status
            );

            alert(result.message);

            await loadTickets();

            setEditingId(null);

            setScheduleId("");
            setPassengerName("");
            setSeatNumber("");
            setPrice("");
            setStatus("Booked");

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    async function handleDeleteTicket(id) {

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa vé này?"
        );

        if (!confirmDelete) return;

        setIsLoading(true);

        setError("");

        try {

            const result = await deleteTicket(id);

            alert(result.message);

            await loadTickets();

        } catch (err) {

            setError(err.message);

        } finally {

            setIsLoading(false);

        }

    }

    // ==========================
    // 5. Search + Sort
    // ==========================

    const filteredTickets = tickets
        .filter((ticket) =>
            ticket.PassengerName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {

            if (sortOrder === "asc") {

                return a.PassengerName.localeCompare(
                    b.PassengerName
                );

            }

            return b.PassengerName.localeCompare(
                a.PassengerName
            );

        });

    // ==========================
    // 6. Pagination
    // ==========================

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentTickets = filteredTickets.slice(
        startIndex,
        endIndex
    );

    const totalPages = Math.ceil(
        filteredTickets.length / itemsPerPage
    );

    function handleSearchChange(value) {

        setSearchTerm(value);

        setCurrentPage(1);

    }

    function handleSortChange(value) {

        setSortOrder(value);

        setCurrentPage(1);

    }

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
    // 7. Return
    // ==========================

    return (

        <div>

            <h1>Quản lý vé Metro</h1>

            {
                error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )
            }

            <TicketForm

                schedules={schedules}

                scheduleId={scheduleId}
                setScheduleId={setScheduleId}

                passengerName={passengerName}
                setPassengerName={setPassengerName}

                seatNumber={seatNumber}
                setSeatNumber={setSeatNumber}

                price={price}
                setPrice={setPrice}

                status={status}
                setStatus={setStatus}

                searchTerm={searchTerm}
                sortOrder={sortOrder}

                handleSearchChange={handleSearchChange}
                handleSortChange={handleSortChange}

                editingId={editingId}

                handleAddTicket={handleAddTicket}
                handleUpdateTicket={handleUpdateTicket}

                isLoading={isLoading}

            />

            <TicketTable

                tickets={currentTickets}

                currentPage={currentPage}
                totalPages={totalPages}

                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}

                handleEdit={handleEdit}

                handleDeleteTicket={handleDeleteTicket}

            />

        </div>

    );

}

export default TicketPage;