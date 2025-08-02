    import { Schema, model } from "mongoose";

    const PublicationSchema = Schema({
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: [true, 'You have to add some content']
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        avatarUrl: {
            type: String,
            default: 'none'
        },
        commentsP: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        status: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true,
        versionKey: false
    });

    export default model('Publication', PublicationSchema)