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

        <div>
            <table>
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
                    {
                        trains.map((train) => (
                            <tr key={train.TrainID}>
                                <td>{train.TrainID}</td>
                                <td>{train.TrainName}</td>
                                <td>{train.Capacity}</td>
                                <td>{train.Company}</td>
                                <td>{train.Status}</td>
                                <td>{train.LineName}</td>
                                <td>
                                    <button onClick={() => handleEdit(train)}>
                                        Sửa
                                    </button>

                                    <button onClick={() =>
                                    handleDeleteTrain(train.TrainID)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    }    
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

export default TrainTable;