function ScheduleForm({
    trains,
    stations,

    trainId,
    setTrainId,

    stationId,
    setStationId,

    arrivalTime,
    setArrivalTime,

    departureTime,
    setDepartureTime,

    stopOrder,
    setStopOrder,

    editingId,

    handleAddSchedule,
    handleUpdateSchedule,

    isLoading,

    searchTerm,
    handleSearchChange,

    sortOrder,
    handleSortChange,
}) {

    return (
        <div className="form-container">

            <h2 className="section-title">
                {editingId === null
                    ? "Thêm lịch mới"
                    : "Cập nhật lịch"}
            </h2>


            {/* ==========================
                GIỜ ĐẾN
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Giờ đến
                </label>

                <input
                    className="form-input"
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) =>
                        setArrivalTime(e.target.value)
                    }
                />

            </div>


            {/* ==========================
                GIỜ ĐI
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Giờ đi
                </label>

                <input
                    className="form-input"
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) =>
                        setDepartureTime(e.target.value)
                    }
                />

            </div>


            {/* ==========================
                THỨ TỰ DỪNG
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Thứ tự dừng
                </label>

                <input
                    className="form-input"
                    type="number"
                    placeholder="Thứ tự dừng"
                    value={stopOrder}
                    onChange={(e) =>
                        setStopOrder(e.target.value)
                    }
                />

            </div>


            {/* ==========================
                TÀU
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Tàu
                </label>

                <select
                    className="form-select"
                    value={trainId}
                    onChange={(e) =>
                        setTrainId(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
                    }
                >

                    <option value="">
                        -- Chọn tàu --
                    </option>

                    {trains.map((train) => (

                        <option
                            key={train.TrainID}
                            value={train.TrainID}
                        >
                            {train.TrainName}
                        </option>

                    ))}

                </select>

            </div>


            {/* ==========================
                GA
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Ga
                </label>

                <select
                    className="form-select"
                    value={stationId}
                    onChange={(e) =>
                        setStationId(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
                    }
                >

                    <option value="">
                        -- Chọn ga --
                    </option>

                    {stations.map((station) => (

                        <option
                            key={station.StationID}
                            value={station.StationID}
                        >
                            {station.StationName}
                        </option>

                    ))}

                </select>

            </div>


            {/* ==========================
                BUTTON
            ========================== */}

            <div className="button-group">

                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={
                        editingId === null
                            ? handleAddSchedule
                            : handleUpdateSchedule
                    }
                >
                    {isLoading
                        ? "Đang xử lý..."
                        : editingId === null
                        ? "Thêm lịch mới"
                        : "Cập nhật lịch"}
                </button>

            </div>

            <hr />

<div className="search-filter">

    <input
        className="search-input"
        type="text"
        placeholder="Tìm theo tên tàu hoặc tên ga..."
        value={searchTerm}
        onChange={(e) =>
            handleSearchChange(e.target.value)
        }
    />

    <select
        className="form-select"
        value={sortOrder}
        onChange={(e) =>
            handleSortChange(e.target.value)
        }
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

export default ScheduleForm;

