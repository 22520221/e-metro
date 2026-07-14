function StationForm({
    stationName,
    setStationName,
    address,
    setAddress,
    searchTerm,
    setSearchTerm,
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
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <br />
            <br />

        </div>
    );
}

export default StationForm;