function ScheduleForm({
                trains,
                stations,

                trainId,
                setTrainId,

                stationId,
                setStationId,

                arrivalTime,
                setArrivalTime,

                departureTime,
                setDepartureTime,

                stopOrder,
                setStopOrder,

                editingId,

                handleAddSchedule,
                handleUpdateSchedule,
                isLoading,
})  {
    return (
        <div>

            <h2>
                {editingId === null ? "Thêm lịch mới" : "Cập nhật lịch"}
            </h2>

            <input
                type="datetime-local"
                placeholder="Giờ đến"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
            />

            <br />
            <br />

            <input
                type="datetime-local"
                placeholder="Giờ đi"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Thứ tự dừng"
                value={stopOrder}
                onChange={(e) => setStopOrder(e.target.value)}
            />

            <br />
            <br />

            <select
                value={trainId}
                onChange={(e) =>
                    setTrainId(
                    e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                    )
                }
            >

                <option value="">
                    -- Chọn tàu --
                </option>

                {
                    trains.map((train)=>(
                <option
                    key={train.TrainID}
                    value={train.TrainID}
                >
                    {train.TrainName}
                </option>
                    ))
                }

            </select>

            <br />
            <br />

            <select
                value={stationId}
                onChange={(e) =>
                    setStationId(
                     e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                    )
                }
            >

                <option value="">
                    -- Chọn ga --
                </option>

                {
                    stations.map((station)=>(
                <option
                    key={station.StationID}
                    value={station.StationID}
                >
                    {station.StationName}
                </option>
                    ))
                    }

            </select>

            <br />
            <br />

            <button
                type="button"
                disabled={isLoading}
                onClick={
                    editingId === null
                        ? handleAddSchedule
                        : handleUpdateSchedule
                }
            >
                {isLoading
                    ? "Đang xử lý..."
                    : editingId === null
                    ? "Thêm lịch mới"
                    : "Cập nhật lịch"}
            </button>

            <br />
            <br />
        </div>
    );
}

export default ScheduleForm;