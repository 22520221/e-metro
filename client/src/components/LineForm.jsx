function LineForm({
    lineName,
    setLineName,

    lineColor,
    setLineColor,

    handleAddLine,
    handleUpdateLine,

    searchTerm,
    sortOrder,

    handleSearchChange,
    handleSortChange,

    editingId,
    isLoading,
}) {

    return (
        <div className="line-form-container">

            <h2 className="line-form-title">
                {
                    editingId === null
                        ? "Thêm tuyến mới"
                        : "Cập nhật tuyến"
                }
            </h2>


            {/* ==========================
                FORM
            ========================== */}

            <div className="line-form">

                <div className="line-form-group">

                    <label>
                        Tên tuyến
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập tên tuyến..."
                        value={lineName}
                        onChange={(e) =>
                            setLineName(e.target.value)
                        }
                    />

                </div>


                <div className="line-form-group">

                    <label>
                        Màu tuyến
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập màu tuyến..."
                        value={lineColor}
                        onChange={(e) =>
                            setLineColor(e.target.value)
                        }
                    />

                </div>


                <button
                    type="button"
                    className="line-submit-button"
                    disabled={isLoading}
                    onClick={
                        editingId === null
                            ? handleAddLine
                            : handleUpdateLine
                    }
                >

                    {
                        isLoading
                            ? "Đang xử lý..."
                            : editingId === null
                            ? "Thêm tuyến"
                            : "Cập nhật tuyến"
                    }

                </button>

            </div>


            {/* ==========================
                SEARCH + SORT
            ========================== */}

            <div className="line-toolbar">

                <div className="line-search">

                    <input
                        type="text"
                        placeholder="Tìm tên tuyến..."
                        value={searchTerm}
                        onChange={(e) =>
                            handleSearchChange(e.target.value)
                        }
                    />

                </div>


                <div className="line-sort">

                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            handleSortChange(e.target.value)
                        }
                    >

                        <option value="asc">
                            ID tăng dần
                        </option>

                        <option value="desc">
                            ID giảm dần
                        </option>

                    </select>

                </div>

            </div>

        </div>
    );
}

export default LineForm;