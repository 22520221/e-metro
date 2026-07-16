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
        <div>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên ga</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>

                    {stations.length === 0 ? (

                        <tr>
                            <td colSpan="4">
                                Không có dữ liệu
                            </td>
                        </tr>

                    ) : (

                        stations.map((station) => (

                            <tr key={station.StationID}>

                                <td>{station.StationID}</td>

                                <td>{station.StationName}</td>

                                <td>{station.Address}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            handleEdit(station)
                                        }
                                    >
                                        Sửa
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                station.StationID
                                            )
                                        }
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span>

                Trang {currentPage} / {totalPages}

            </span>

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>

        </div>
    );
}

export default StationTable;