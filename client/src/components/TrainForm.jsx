function TrainForm({
    trainName,
    setTrainName,

    capacity,
    setCapacity,

    company,
    setCompany,

    status,
    setStatus,

    lines,
    lineId,
    setLineId,

    editingId,

    handleAddTrain,
    handleUpdateTrain,

    isLoading
}) {

    return (
        <div className="form-container">

            <h2 className="section-title">
                {editingId === null
                    ? "Thêm tàu mới"
                    : "Cập nhật tàu"}
            </h2>

            {/* ==========================
                TÊN TÀU
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Tên tàu
                </label>

                <input
                    className="form-input"
                    type="text"
                    placeholder="Tên tàu"
                    value={trainName}
                    onChange={(e) =>
                        setTrainName(e.target.value)
                    }
                />

            </div>

            {/* ==========================
                SỨC CHỨA
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Sức chứa
                </label>

                <input
                    className="form-input"
                    type="number"
                    placeholder="Sức chứa"
                    value={capacity}
                    onChange={(e) =>
                        setCapacity(e.target.value)
                    }
                />

            </div>

            {/* ==========================
                CÔNG TY
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Công ty
                </label>

                <input
                    className="form-input"
                    type="text"
                    placeholder="Công ty"
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                />

            </div>

            {/* ==========================
                TRẠNG THÁI
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Trạng thái
                </label>

                <select
                    className="form-select"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
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

            </div>

            {/* ==========================
                TUYẾN
            ========================== */}

            <div className="form-group">

                <label className="form-label">
                    Tuyến
                </label>

                <select
                    className="form-select"
                    value={lineId}
                    onChange={(e) =>
                        setLineId(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
                    }
                >

                    <option value="">
                        -- Chọn tuyến --
                    </option>

                    {lines.map((line) => (

                        <option
                            key={line.LineID}
                            value={line.LineID}
                        >
                            {line.LineName}
                        </option>

                    ))}

                </select>

            </div>

            {/* ==========================
                BUTTON
            ========================== */}

            <div className="button-group">

                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={
                        editingId === null
                            ? handleAddTrain
                            : handleUpdateTrain
                    }
                >
                    {isLoading
                        ? "Đang xử lý..."
                        : editingId === null
                        ? "Thêm tàu"
                        : "Cập nhật tàu"}
                </button>

            </div>

        </div>
    );
}

export default TrainForm;

