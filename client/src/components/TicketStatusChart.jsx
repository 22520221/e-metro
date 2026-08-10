function TicketStatusChart({ ticketStats }) {

    const maxTotal = Math.max(
        ...ticketStats.map((item) => item.Total),
        1
    );

    return (
        <div>

            <h2>Biểu đồ vé theo trạng thái</h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "30px",
                    height: "250px",
                    marginTop: "30px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px"
                }}
            >

                {ticketStats.map((item) => {

                    const height =
                        (item.Total / maxTotal) * 200;

                    return (
                        <div
                            key={item.Status}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >

                            <strong>
                                {item.Total}
                            </strong>

                            <div
                                style={{
                                    width: "60px",
                                    height: `${height}px`,
                                    backgroundColor: "#3498db",
                                    marginTop: "5px"
                                }}
                            />

                            <p>
                                {item.Status}
                            </p>

                        </div>
                    );

                })}

            </div>

        </div>
    );
}

export default TicketStatusChart;