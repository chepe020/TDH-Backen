import Event from "./event.model.js";


export const createEvent = async (req, res) => {
    try {
        const { title, description, dateStart } = req.body;

        const newEvent = new Event({
            title,
            description,
            dateStart: new Date(dateStart),
            user: req.usuario._id
        });

        const savedEvent = await newEvent.save();

        res.status(200).json({
            success: true,
            msg: "Event saved successfully",
            savedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const { status, all } = req.query;

        const filter = { user: req.usuario._id };

        if (status === "true") filter.status = true;
        else if (status === "false") filter.status = false;

        let query = Event.find(filter);

        if (all === "true") query = query.limit(2);

        const events = await query;

        res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getEventByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const event = await Event.find({ title: new RegExp(title, "i") });
        if (event.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            success: true,
            events: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id, updateData } = req.updateEvent;

        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

        res.json({
            success: true,
            msg: "Event updated successfully",
            updatedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        const deletedEvent = await Event.findByIdAndDelete(id);

        res.json({
            success: true,
            deletedEvent: {
                _id: deletedEvent._id,
                title: deletedEvent.title,
                description: deletedEvent.description
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};