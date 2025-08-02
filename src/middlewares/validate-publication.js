import Publication from "../publications/publication.model.js";

export const isPublicationOwnerOrAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const requesterId = req.usuario._id;
        const requesterRole = req.usuario.role;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: "Publication not found"
            });
        }

        if (
            publication.author.toString() !== requesterId.toString() &&
            requesterRole !== "ADMIN_ROLE"
        ) {
            return res.status(403).json({
                success: false,
                msg: "You do not have permission to perform this action"
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error validating publication owner/admin",
            error: error.message
        });
    }
};