function TicketTable({
    tickets,

    handleEdit,
    handleCancelTicket,

    currentPage,
    totalPages,

    handleNextPage,
    handlePreviousPage,
}) {

    return (

        <div className="page-section">

            <h2 className="section-title">
                Danh sách vé
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
                            <th>Hành khách</th>
                            <th>Số ghế</th>
                            <th>Giá vé</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            tickets.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="empty-data"
                                    >
                                        Không có dữ liệu
                                    </td>

                                </tr>

                            ) : (

                                tickets.map((ticket) => (

                                    <tr
                                        key={ticket.TicketID}
                                    >

                                        <td>
                                            {ticket.TicketID}
                                        </td>

                                        <td>
                                            <span 
                                                className=
                                                {`status-badge status-${ticket.Status.toLowerCase()}`}>
                                                {ticket.Status}
                                            </span>
                                        </td>

                                        <td>
                                            {ticket.StationName}
                                        </td>

                                        <td>
                                            {ticket.PassengerName}
                                        </td>

                                        <td>
                                            {ticket.SeatNumber}
                                        </td>

                                        <td>
                                            {Number(ticket.Price).toLocaleString("vi-VN")} ₫
                                        </td>

                                        <td>
                                            {ticket.Status}
                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="table-actions">

                                                {ticket.Status === "Booked" && (
                                                <>
                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() => handleEdit(ticket)}
                                                >
                                                    Sửa
                                                </button>

                                                <button
                                                    className="btn btn-delete"
                                                    onClick={() =>
                                                    handleCancelTicket(ticket.TicketID)
                                                }
                                                >
                                                    Hủy vé
                                                </button>
                                                </>
                                                )}

                                                {ticket.Status === "Used" && (
                                                    <span>
                                                        Đã sử dụng
                                                    </span>
                                                )}

                                                {ticket.Status === "Cancelled" && (
                                                    <span>
                                                        Đã hủy
                                                    </span>
                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )
                        }

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
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

            </div>

        </div>

    );

}

export default TicketTable;

