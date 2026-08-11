function TicketForm({
    schedules,

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


                {/* Số ghế */}

                <div className="form-group">

                    <label className="form-label">
                        Số ghế
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Nhập số ghế"
                        value={seatNumber}
                        onChange={(e) =>
                            setSeatNumber(e.target.value)
                        }
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
                        A → Z
                    </option>

                    <option value="desc">
                        Z → A
                    </option>

                </select>

            </div>

        </div>

    );

}

export default TicketForm;

