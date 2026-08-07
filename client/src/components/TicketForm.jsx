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
        <div>

            <h2>
                {
                    editingId === null
                        ? "Thêm vé mới"
                        : "Cập nhật vé"
                }
            </h2>

            {/* Chọn lịch */}

            <select
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
                            Lịch #{schedule.ScheduleID} - {schedule.TrainName} - {schedule.StationName}
                        </option>

                    ))
                }

            </select>

            <br />
            <br />

            {/* Tên hành khách */}

            <input
                type="text"
                placeholder="Tên hành khách"
                value={passengerName}
                onChange={(e) =>
                    setPassengerName(e.target.value)
                }
            />

            <br />
            <br />

            {/* Số ghế */}

            <input
                type="text"
                placeholder="Số ghế"
                value={seatNumber}
                onChange={(e) =>
                    setSeatNumber(e.target.value)
                }
            />

            <br />
            <br />

            {/* Giá */}

            <input
                type="number"
                placeholder="Giá vé"
                value={price}
                onChange={(e) =>
                    setPrice(Number(e.target.value))
                }
            />

            <br />
            <br />

            {/* Trạng thái */}

            <select
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

            <br />
            <br />

            {/* Button */}

            <button
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

            <hr />

            {/* Search */}

            <input
                type="text"
                placeholder="Tìm hành khách..."
                value={searchTerm}
                onChange={(e) =>
                    handleSearchChange(e.target.value)
                }
            />

            <br />
            <br />

            {/* Sort */}

            <select
                value={sortOrder}
                onChange={(e) =>
                    handleSortChange(e.target.value)
                }
            >

                <option value="asc">
                    A → Z
                </option>

                <option value="desc">
                    Z → A
                </option>

            </select>

            <br />
            <br />

        </div>
    );
}

export default TicketForm;