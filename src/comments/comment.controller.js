import Comment from "../comments/comment.model.js";
import Publication from "../publications/publication.model.js"

export const saveComment = async (req, res) => {
    try {
        const { content, publicationId } = req.body;

        const newComment = new Comment({
            content,
            publicationId,
            authorComment: req.usuario._id
        });

        await newComment.save();

        await Publication.findByIdAndUpdate(publicationId, {
            $push: { commentsP: newComment._id }
        });

        res.status(200).json({
            success: true,
            message: "Saved comment",
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving comment",
            error: error.message
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [comments, total] = await Promise.all([
            Comment.find({ status: true })
                .populate("publicationId", "title")
                .skip(Number(desde))
                .limit(Number(limite)),
            Comment.countDocuments({ status: true })
        ]);

        res.status(200).json({
            success: true,
            total,
            comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting comments",
            error: error.message
        });
    }
};

export const searchComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id).populate("publicationId", "title");

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching for comment",
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updateFields = {};
        if (content !== undefined) updateFields.content = content;

        const updated = await Comment.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Updated comment",
            comment: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating comment",
            error: error.message
        });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        await Comment.findByIdAndUpdate(id, { status: false });

        await Publication.findByIdAndUpdate(comment.publicationId, {
            $pull: { commentsP: comment._id }
        });

        res.status(200).json({
            success: true,
            message: "Comment successfully deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const { limite = 10, desde = 0 } = req.query;

        const comments = await Comment.find({ publicationId, status: true })
            .sort({ createdAt: -1 })
            .skip(Number(desde))
            .limit(Number(limite));

        res.status(200).json({
            success: true,
            total: comments.length,
            comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting comments from the post",
            error: error.message
        });
    }
};