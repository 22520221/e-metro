function ScheduleTable({
    schedules,

    handleEdit,
    handleDeleteSchedule,

    handleNextPage,
    handlePreviousPage,

    currentPage,
    totalPages,
}) {

    return (
        <div className="page-section">

            <h2 className="section-title">
                Danh sách lịch chạy
            </h2>


            {/* ==========================
                TABLE
            ========================== */}

            <div className="table-container">

                <table className="data-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Tàu</th>
                            <th>Ga</th>
                            <th>Giờ đến</th>
                            <th>Giờ đi</th>
                            <th>Thứ tự dừng</th>
                            <th>Hành động</th>

                        </tr>

                    </thead>


                    <tbody>

                        {schedules.length === 0 ? (

                            <tr>

                                <td colSpan="7">
                                    Không có dữ liệu
                                </td>

                            </tr>

                        ) : (

                            schedules.map((schedule) => (

                                <tr key={schedule.ScheduleID}>

                                    <td>
                                        {schedule.ScheduleID}
                                    </td>

                                    <td>
                                        {schedule.TrainName}
                                    </td>

                                    <td>
                                        {schedule.StationName}
                                    </td>

                                    <td>
                                        {new Date(
                                            schedule.ArrivalTime
                                        ).toLocaleString("vi-VN")}
                                    </td>

                                    <td>
                                        {new Date(
                                            schedule.DepartureTime
                                        ).toLocaleString("vi-VN")}
                                    </td>

                                    <td>
                                        {schedule.StopOrder}
                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <button
                                                className="btn btn-edit"
                                                onClick={() =>
                                                    handleEdit(schedule)
                                                }
                                            >
                                                Sửa
                                            </button>


                                            <button
                                                className="btn btn-delete"
                                                onClick={() =>
                                                    handleDeleteSchedule(
                                                        schedule.ScheduleID
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
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default ScheduleTable;

