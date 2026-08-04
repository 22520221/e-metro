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
        <div>

            <h2>
                {editingId === null ? "Thêm ga mới" : "Cập nhật ga"}
            </h2>

            <input
                type="text"
                placeholder="Tên ga"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <br />
            <br />

            <select
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
            >

            <option value="">
                -- Chọn tuyến --
            </option>

            {
                lines.map((line) => (

                <option
                    key={line.LineID}
                    value={line.LineID}
                >
                    {line.LineName}
                </option>

                ))
            }

            </select>

            <br />
            <br />

            <br />
            <br />

            <button
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

            <hr />

            <input
                type="text"
                placeholder="Tìm kiếm ga..."
                value={searchTerm}
                onChange={(e)=>

                handleSearchChange(e.target.value)

                }
            />

            <br />
            <br />

            <select
                value={sortOrder}
                onChange={(e)=>

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

            <br />
            <br />
        </div>
    );
}

export default StationForm;