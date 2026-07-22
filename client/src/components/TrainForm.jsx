function TrainForm({
    trainName,
    setTrainName,

    capacity,
    setCapacity,

    company,
    setCompany,

    status,
    setStatus,

    editingId,

    handleAddTrain,
    handleUpdateTrain,

    isLoading
}) {

    return (

        <div>
                <h2>{editingId === null ? "Thêm tàu mới" : "Cập nhật tàu"}</h2>

                <input
                    type="text"
                    placeholder="Tên tàu"
                    value={trainName}
                    onChange={(e) => setTrainName(e.target.value)}
                />

                <input
                type="number"
                placeholder="Sức chứa"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                />

                <input
                type="text"
                placeholder="Công ty"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Active">
                        Active
                    </option>
                    <option value="Maintenance">
                        Maintenance
                    </option>
                    <option value="Inactive">
                        Inactive
                    </option>
                </select>

                <button
                    disabled={isLoading}
                    onClick={
                        editingId === null
                        ? handleAddTrain
                        : handleUpdateTrain
                    }
                >
                    {
                        isLoading
                        ? "Đang xử lý..."
                        : editingId === null
                        ? "Thêm tàu"
                        : "Cập nhật tàu"
                    }
                </button>
        </div>

    );

}

export default TrainForm;