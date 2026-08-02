const express = require("express");
const cors = require("cors");

const stationRoutes = require("./routes/stationRoutes");
const trainRoutes = require("./routes/trainRoutes");
const lineRoutes = require("./routes/lineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stations", stationRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/lines", lineRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Metro API đang chạy"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});