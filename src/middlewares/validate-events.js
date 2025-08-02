import Event from "../events/event.model.js";

export const validateUpdateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updateData = req.body;

        if (updateData.dateStart) {
            updateData.dateStart = new Date(updateData.dateStart);
        }

        req.updateEvent = {
            id: id,
            updateData
        };

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

export const validateDeleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}
