function ScheduleTable({
    schedules,

    handleEdit,
    handleDeleteSchedule,
}) {
    return (
        <div>
            <table border="1" cellPadding="8">
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

                    {
                        schedules.length === 0 ? (

                    <tr>

                        <td colSpan="7">
                            Không có dữ liệu
                        </td>

                    </tr>

                    ) : (

                        schedules.map((schedule) => (

                    <tr key={schedule.ScheduleID}>

                        <td>{schedule.ScheduleID}</td>

                        <td>{schedule.TrainName}</td>

                        <td>{schedule.StationName}</td>

                        <td>
                            {new Date(schedule.ArrivalTime).toLocaleString("vi-VN")}
                        </td>

                        <td>
                            {new Date(schedule.DepartureTime).toLocaleString("vi-VN")}
                        </td>

                        <td>{schedule.StopOrder}</td>

                        <td>

                            <button
                                onClick={() => handleEdit(schedule)}
                            >
                                Sửa
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                handleDeleteSchedule(schedule.ScheduleID)
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
        </div>
    );
}

export default ScheduleTable;