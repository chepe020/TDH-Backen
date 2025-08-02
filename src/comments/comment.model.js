import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    authorComment: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, "The content is required"]
    },
    publicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Comment", CommentSchema);