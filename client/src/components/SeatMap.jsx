function SeatMap({
    tickets,
    scheduleId,
    seatNumber,
    setSeatNumber,
    editingId,
}) {

    const rows = ["A", "B", "C"];

    function isSeatBooked(seat) {

        return tickets.some((ticket) => {

            return (
                String(ticket.ScheduleID) === String(scheduleId) &&
                ticket.SeatNumber === seat &&
                ticket.Status !== "Cancelled" &&
                String(ticket.TicketID) !== String(editingId)
            );

        });

    }

    function handleSelectSeat(seat) {

        if (isSeatBooked(seat)) {
            return;
        }

        setSeatNumber(seat);

    }

    return (

        <div className="seat-map">

            <h3>Chọn ghế</h3>


            {/* Legend */}

            <div className="seat-legend">

                <div className="legend-item">

                    <span className="legend-seat available"></span>

                    <span>Ghế trống</span>

                </div>


                <div className="legend-item">

                    <span className="legend-seat selected"></span>

                    <span>Đang chọn</span>

                </div>


                <div className="legend-item">

                    <span className="legend-seat booked"></span>

                    <span>Đã đặt</span>

                </div>

            </div>


            {
                rows.map((row) => (

                    <div
                        className="seat-row"
                        key={row}
                    >

                        <span className="seat-row-label">
                            {row}
                        </span>


                        {
                            Array.from(
                                { length: 12 },
                                (_, index) => {

                                    const seat =
                                        `${row}${String(index + 1).padStart(2, "0")}`;

                                    const booked =
                                        isSeatBooked(seat);

                                    const selected =
                                        seatNumber === seat;


                                    return (

                                        <button
                                            key={seat}
                                            type="button"
                                            disabled={booked}
                                            className={
                                                booked
                                                    ? "seat booked"
                                                    : selected
                                                        ? "seat selected"
                                                        : "seat available"
                                            }
                                            onClick={() =>
                                                handleSelectSeat(seat)
                                            }
                                        >

                                            {seat}

                                        </button>

                                    );

                                }
                            )
                        }

                    </div>

                ))
            }

        </div>

    );

}

export default SeatMap;