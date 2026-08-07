function TicketTable({
    tickets,
    handleEdit,
    handleDeleteTicket,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
}) {

    return (
        <div>

            <h3>Danh sách vé</h3>

            <table border="1" cellPadding="10">

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
                                <td colSpan="8">
                                    Không có dữ liệu
                                </td>
                            </tr>

                        ) : (

                            tickets.map((ticket) => (

                                <tr key={ticket.TicketID}>

                                    <td>{ticket.TicketID}</td>
                                    <td>{ticket.TrainName}</td>
                                    <td>{ticket.StationName}</td>
                                    <td>{ticket.PassengerName}</td>
                                    <td>{ticket.SeatNumber}</td>
                                    <td>{ticket.Price}</td>
                                    <td>{ticket.Status}</td>

                                    <td>

                                        <button
                                            onClick={() => handleEdit(ticket)}
                                        >
                                            Sửa
                                        </button>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                handleDeleteTicket(ticket.TicketID)
                                            }
                                        >
                                            Xóa
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )
                    }

                </tbody>

            </table>

            <br />

            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {" "}

            <span>
                Trang {currentPage} / {totalPages}
            </span>

            {" "}

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>

        </div>
    );
}

export default TicketTable;