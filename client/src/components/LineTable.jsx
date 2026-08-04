function LineTable({

    lines,

    handleEdit,
    handleDeleteLine,

}) {

    return (

        <div>

            <h3>Danh sách tuyến</h3>

            <table border="1" cellPadding="10">

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
                        lines.map((line) => (

                            <tr key={line.LineID}>

                                <td>{line.LineID}</td>

                                <td>{line.LineName}</td>

                                <td>{line.LineColor}</td>

                                <td>

                                    <button
                                        onClick={() => handleEdit(line)}
                                    >
                                        Sửa
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() => handleDeleteLine(line.LineID)}
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default LineTable;