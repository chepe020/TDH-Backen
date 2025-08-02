import Comment from "../comments/comment.model.js";

export const isCommentOwnerOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requesterId = req.usuario._id;
    const requesterRole = req.usuario.role;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        msg: "Comment not found"
      });
    }

    if (
      comment.authorComment.toString() !== requesterId.toString() &&
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
      msg: "Error validating comment owner/admin",
      error: error.message
    });
  }
};
