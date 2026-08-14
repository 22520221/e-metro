function StationTable({
    stations,

    handleEdit,
    handleDelete,

    handleNextPage,
    handlePreviousPage,

    currentPage,
    totalPages
}) {
    return (
        <div className="page-section">

            <h2 className="section-title">
                Danh sách ga
            </h2>


            {/* ==========================
                TABLE
            ========================== */}

            <div className="table-container">

                <table className="data-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Tên ga</th>

                            <th>Địa chỉ</th>

                            <th>Tuyến</th>

                            <th>Hành động</th>

                        </tr>

                    </thead>


                    <tbody>

                        {stations.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    Không có dữ liệu
                                </td>

                            </tr>

                        ) : (

                            stations.map((station) => (

                                <tr key={station.StationID}>

                                    <td>
                                        {station.StationID}
                                    </td>

                                    <td>
                                        {station.StationName}
                                    </td>

                                    <td>
                                        {station.Address}
                                    </td>

                                    <td>
                                        {station.LineName || "Chưa có tuyến"}
                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <button
                                                className="btn btn-edit"
                                                onClick={() =>
                                                    handleEdit(station)
                                                }
                                            >
                                                Sửa
                                            </button>


                                            <button
                                                className="btn btn-delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        station.StationID
                                                    )
                                                }
                                            >
                                                Xóa
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>


            {/* ==========================
                PAGINATION
            ========================== */}

            <div className="pagination">

                <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>


                <span className="pagination-info">

                    Trang {currentPage} / {totalPages}

                </span>


                <button
                    className="btn btn-secondary"
                    onClick={handleNextPage}
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default StationTable;
