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

        const { lineName, lineColor } = req.body;

        const exists = await lineService.checkLineNameExists(
            lineName.trim()
        );

        if (exists) {
            return res.status(400).json({
                error: "Tên tuyến đã tồn tại."
            });
        }

        if (!lineName || !lineName.trim()) {
            return res.status(400).json({
                error: "Tên tuyến không được để trống."
            });
        }

        if (!lineColor || !lineColor.trim()) {
            return res.status(400).json({
                error: "Màu tuyến không được để trống."
            });
        }

        if (lineName.trim().length < 2) {
            return res.status(400).json({
                error: "Tên tuyến phải có ít nhất 2 ký tự."
            });
        }

        if (lineName.trim().length > 100) {
            return res.status(400).json({
                error: "Tên tuyến không được vượt quá 100 ký tự."
            });
        }

        if (lineColor.trim().length > 50) {
            return res.status(400).json({
                error: "Màu tuyến không được vượt quá 50 ký tự."
            });
        }

        await lineService.addLine(
            lineName.trim(),
            lineColor.trim()
        );

        return res.json({
            message: "Thêm tuyến thành công!"
        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }
}

async function updateLine(req, res) {

    try {

        const { id } = req.params;

        const { lineName, lineColor } = req.body;

        const exists = await lineService.checkLineNameExists(
            lineName.trim(),
            id
        );

        if (exists) {
            return res.status(400).json({
                error: "Tên tuyến đã tồn tại."
            });
        }

        if (!id) {
            return res.status(400).json({
                error: "Không xác định được tuyến cần cập nhật."
            });
        }

        if (!lineName || !lineName.trim()) {
            return res.status(400).json({
                error: "Tên tuyến không được để trống."
            });
        }

        if (!lineColor || !lineColor.trim()) {
            return res.status(400).json({
                error: "Màu tuyến không được để trống."
            });
        }

        if (lineName.trim().length < 2) {
            return res.status(400).json({
                error: "Tên tuyến phải có ít nhất 2 ký tự."
            });
        }

        if (lineName.trim().length > 100) {
            return res.status(400).json({
                error: "Tên tuyến không được vượt quá 100 ký tự."
            });
        }

        if (lineColor.trim().length > 50) {
            return res.status(400).json({
                error: "Màu tuyến không được vượt quá 50 ký tự."
            });
        }

        await lineService.updateLine(
            id,
            lineName.trim(),
            lineColor.trim()
        );

        return res.json({
            message: "Cập nhật tuyến thành công!"
        });

    } catch (err) {

        return res.status(500).json({
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