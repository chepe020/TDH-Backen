import Publication from "./publication.model.js";

export const savePublication = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const publication = new Publication({
            title,
            content,
            author: req.usuario._id,
            status: true
        });

        await publication.save();
        res.status(200).json({
            success: true,
            msg: 'Post uploaded',
            publication
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error saving post',
            error
        });
    }
}

export const searchPublication = async (req, res) => {
    const { id } = req.params;
    try {
        const publication = await Publication.findById(id)
            .populate("commentsP");

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            publication
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error finding publication',
            error
        });
    }
}

export const getPublications = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [total, publications] = await Promise.all([
            Publication.countDocuments({ status: true }),
            Publication.find({ status: true })
                .skip(Number(desde))
                .limit(Number(limite))
                .sort({ createdAt: -1 })
        ]);

        res.status(200).json({
            success: true,
            total,
            publications
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error getting publications',
            error
        });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Publication marked as deleted',
            publication
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error deleting publication',
            error
        });
    }
}

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const updatedData = { title, content, author };

        const publication = await Publication.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Publication updated',
            publication
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error updating publication',
            error
        });
    }
}
