import { model, Schema } from "mongoose";

const EventsSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, "The title is required"]
    },
    description: {
        type: String,
        required: [true, "The description is required"]
    },
    dateStart: {
        type: Date,
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

export default model("Event", EventsSchema);