function LineForm({
    lineName,
    setLineName,

    lineColor,
    setLineColor,

    handleAddLine,

    editingId,

    isLoading,
}) {

    return (

        <div>

            <h2>

                {
                    editingId === null
                        ? "Thêm tuyến mới"
                        : "Cập nhật tuyến"

                }

            </h2>

            <input
                type="text"
                placeholder="Tên tuyến"
                value={lineName}
                onChange={(e)=>setLineName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Màu tuyến"
                value={lineColor}
                onChange={(e)=>setLineColor(e.target.value)}
            />

            <br />
            <br />

            <button
            type="button"
            onClick={handleAddLine}
            disabled={isLoading}>

                {
                    editingId === null
                        ? "Thêm tuyến"
                        : "Cập nhật tuyến"
                }

            </button>

        </div>

    );

}

export default LineForm;