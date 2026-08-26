import SeatMap from "./SeatMap";

function TicketForm({
    schedules,
    tickets,

    scheduleId,
    setScheduleId,

    passengerName,
    setPassengerName,

    seatNumber,
    setSeatNumber,

    price,
    setPrice,

    status,
    setStatus,

    searchTerm,
    sortOrder,

    handleSearchChange,
    handleSortChange,

    handleAddTicket,
    handleUpdateTicket,

    editingId,

    isLoading,
}) {

    const selectedSchedule = schedules.find(
        (schedule) =>
            String(schedule.ScheduleID) === String(scheduleId)
    );

    const capacity = selectedSchedule?.Capacity || 0;

    const scheduleTickets = tickets.filter(
        (ticket) =>
            String(ticket.ScheduleID) === String(scheduleId)
    );

    const bookedCount = scheduleTickets.filter(
        (ticket) =>
            ticket.Status === "Booked" ||
            ticket.Status === "Paid"
    ).length;

    const usedCount = scheduleTickets.filter(
        (ticket) =>
            ticket.Status === "Used"
    ).length;

    const availableCount =
        Math.max(
            0,
            capacity - bookedCount - usedCount
        );
    
    return (

        <div className="page-section">

            {/* ==========================
                FORM
            ========================== */}

            <div className="form-container">

                <h2 className="section-title">

                    {
                        editingId === null
                            ? "Thêm vé mới"
                            : "Cập nhật vé"
                    }

                </h2>


                {/* Chọn lịch */}

                <div className="form-group">

                    <label className="form-label">
                        Lịch chạy
                    </label>

                    <select
                        className="form-select"
                        value={scheduleId}
                        onChange={(e) =>
                            setScheduleId(Number(e.target.value))
                        }
                    >

                        <option value="">
                            -- Chọn lịch --
                        </option>

                        {
                            schedules.map((schedule) => (

                                <option
                                    key={schedule.ScheduleID}
                                    value={schedule.ScheduleID}
                                >

                                    Lịch #{schedule.ScheduleID}
                                    {" - "}
                                    {schedule.TrainName}
                                    {" - "}
                                    {schedule.StationName}

                                </option>

                            ))
                        }

                    </select>

                </div>

                {/* Tên hành khách */}

                <div className="form-group">

                    <label className="form-label">
                        Tên hành khách
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Nhập tên hành khách"
                        value={passengerName}
                        onChange={(e) =>
                            setPassengerName(e.target.value)
                        }
                    />

                </div>

                {/* Thống kê ghế */}

{
    scheduleId && selectedSchedule && (

        <div className="seat-statistics">

            <div className="seat-stat-item">
                <span>Tổng ghế</span>
                <strong>{capacity}</strong>
            </div>

            <div className="seat-stat-item">
                <span>Đã đặt</span>
                <strong>{bookedCount}</strong>
            </div>

            <div className="seat-stat-item">
                <span>Đã sử dụng</span>
                <strong>{usedCount}</strong>
            </div>

            <div className="seat-stat-item">
                <span>Còn trống</span>
                <strong>{availableCount}</strong>
            </div>

        </div>

    )
}


{/* SeatMap */}

<div className="form-group">

    <SeatMap
        tickets={tickets}
        scheduleId={scheduleId}
        seatNumber={seatNumber}
        setSeatNumber={setSeatNumber}
        editingId={editingId}
    />

</div>


                {/* Giá vé */}

                <div className="form-group">

                    <label className="form-label">
                        Giá vé
                    </label>

                    <input
                        className="form-input"
                        type="number"
                        placeholder="Nhập giá vé"
                        value={price}
                        onChange={(e) =>
                            setPrice(Number(e.target.value))
                        }
                    />

                </div>


                {/* Trạng thái */}

                <div className="form-group">

                    <label className="form-label">
                        Trạng thái
                    </label>

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >

                        <option value="Booked">
                            Booked
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                        <option value="Used">
                            Used
                        </option>

                    </select>

                </div>


                {/* Button */}

                <div className="button-group">

                    <button
                        className="btn btn-primary"
                        type="button"
                        disabled={isLoading}
                        onClick={
                            editingId === null
                                ? handleAddTicket
                                : handleUpdateTicket
                        }
                    >

                        {
                            isLoading
                                ? "Đang xử lý..."
                                : editingId === null
                                ? "Thêm vé"
                                : "Cập nhật vé"
                        }

                    </button>

                </div>

            </div>


            {/* ==========================
                SEARCH + SORT
            ========================== */}

            <div
                className="search-filter"
                style={{ marginTop: "25px" }}
            >

                {/* Search */}

                <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm hành khách..."
                    value={searchTerm}
                    onChange={(e) =>
                        handleSearchChange(e.target.value)
                    }
                />


                {/* Sort */}

                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) =>
                        handleSortChange(e.target.value)
                    }
                    style={{ width: "180px" }}
                >

                    <option value="asc">
                        ID tăng dần
                    </option>

                    <option value="desc">
                        ID giảm dần
                    </option>

                </select>

            </div>

        </div>

    );

}

export default TicketForm;

