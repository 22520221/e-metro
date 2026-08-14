function TrainTable({
    trains,

    handleEdit,
    handleDeleteTrain,

    currentPage,
    totalPages,

    handleNextPage,
    handlePreviousPage
}) {

    return (
        <div className="page-section">

            <h2 className="section-title">
                Danh sách tàu
            </h2>


            {/* ==========================
                TABLE
            ========================== */}

            <div className="table-container">

                <table className="data-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Tên tàu</th>
                            <th>Sức chứa</th>
                            <th>Công ty</th>
                            <th>Trạng thái</th>
                            <th>Tuyến</th>
                            <th>Hành động</th>

                        </tr>

                    </thead>


                    <tbody>

                        {trains.length === 0 ? (

                            <tr>

                                <td colSpan="7">
                                    Không có dữ liệu
                                </td>

                            </tr>

                        ) : (

                            trains.map((train) => (

                                <tr key={train.TrainID}>

                                    <td>
                                        {train.TrainID}
                                    </td>

                                    <td>
                                        {train.TrainName}
                                    </td>

                                    <td>
                                        {train.Capacity}
                                    </td>

                                    <td>
                                        {train.Company}
                                    </td>

                                    <td>
                                        {train.Status}
                                    </td>

                                    <td>
                                        {train.LineName || "Chưa có tuyến"}
                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <button
                                                className="btn btn-edit"
                                                onClick={() =>
                                                    handleEdit(train)
                                                }
                                            >
                                                Sửa
                                            </button>


                                            <button
                                                className="btn btn-delete"
                                                onClick={() =>
                                                    handleDeleteTrain(
                                                        train.TrainID
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

export default TrainTable;

