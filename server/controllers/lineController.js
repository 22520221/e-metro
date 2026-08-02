const lineService = require("../services/lineService");

async function getLines(req, res) {
    try {

        const lines = await lineService.getLines();

        res.json(lines);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function addLine(req, res) {
    try {

        const { LineName, LineColor } = req.body;

        await lineService.addLine(
            LineName,
            LineColor
        );

        res.json({
            message: "Thêm tuyến thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function updateLine(req, res) {
    try {

        const { id } = req.params;

        const { LineName, LineColor } = req.body;

        await lineService.updateLine(
            id,
            LineName,
            LineColor
        );

        res.json({
            message: "Cập nhật tuyến thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

async function deleteLine(req, res) {
    try {

        const { id } = req.params;

        await lineService.deleteLine(id);

        res.json({
            message: "Xóa tuyến thành công!"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    getLines,
    addLine,
    updateLine,
    deleteLine
};