function StationForm({
    stationName,
    setStationName,

    address,
    setAddress,

    lines,
    lineId,
    setLineId,

    searchTerm,
    handleSearchChange,

    sortOrder,
    handleSortChange,

    editingId,

    handleAddStation,
    handleUpdateStation,

    isLoading,
}) {
    return (
        <div className="form-container">

            <h2 className="section-title">
                {editingId === null
                    ? "Thêm ga mới"
                    : "Cập nhật ga"}
            </h2>


            {/* ==========================
                TÊN GA
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Tên ga
                </label>

                <input
                    className="form-input"
                    type="text"
                    placeholder="Tên ga"
                    value={stationName}
                    onChange={(e) =>
                        setStationName(e.target.value)
                    }
                />

            </div>


            {/* ==========================
                ĐỊA CHỈ
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Địa chỉ
                </label>

                <input
                    className="form-input"
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                />

            </div>


            {/* ==========================
                TUYẾN
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Tuyến
                </label>

                <select
                    className="form-select"
                    value={lineId}
                    onChange={(e) =>
                        setLineId(e.target.value)
                    }
                >

                    <option value="">
                        -- Chọn tuyến --
                    </option>

                    {lines.map((line) => (

                        <option
                            key={line.LineID}
                            value={line.LineID}
                        >
                            {line.LineName}
                        </option>

                    ))}

                </select>

            </div>


            {/* ==========================
                BUTTON
            ========================== */}

            <div className="button-group">

                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={
                        editingId === null
                            ? handleAddStation
                            : handleUpdateStation
                    }
                >
                    {isLoading
                        ? "Đang xử lý..."
                        : editingId === null
                        ? "Thêm ga mới"
                        : "Cập nhật ga"}
                </button>

            </div>


            <hr />


            {/* ==========================
                SEARCH / SORT
            ========================== */}

            <div className="search-filter">

                <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm kiếm ga..."
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

export default StationForm;

