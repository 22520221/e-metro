function LineTable({

    lines,

    currentPage,
    totalPages,

    handleEdit,
    handleDeleteLine,

    handleNextPage,
    handlePreviousPage

}) {

    return (

        <div className="line-table-container">

            <h3 className="line-table-title">
                Danh sách tuyến
            </h3>


            <div className="line-table-wrapper">

                <table className="line-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Tên tuyến</th>
                            <th>Màu tuyến</th>
                            <th>Hành động</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            lines.length === 0 ? (

                                <tr>

                                    <td colSpan="4" className="line-empty">

                                        Không có dữ liệu

                                    </td>

                                </tr>

                            ) : (

                                lines.map((line) => (

                                    <tr key={line.LineID}>

                                        <td>
                                            {line.LineID}
                                        </td>


                                        <td>
                                            {line.LineName}
                                        </td>


                                        <td>

                                            <div className="line-color">

                                                <span
                                                    className="line-color-preview"
                                                    style={{
                                                        backgroundColor:
                                                            line.LineColor
                                                    }}
                                                />

                                                <span>
                                                    {line.LineColor}
                                                </span>

                                            </div>

                                        </td>


                                        <td>

                                            <div className="line-actions">

                                                <button
                                                    className="line-edit-button"
                                                    onClick={() =>
                                                        handleEdit(line)
                                                    }
                                                >
                                                    Sửa
                                                </button>


                                                <button
                                                    className="line-delete-button"
                                                    onClick={() =>
                                                        handleDeleteLine(
                                                            line.LineID
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </button>

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

            <div className="line-pagination">

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

        </div>

    );

}

export default LineTable;