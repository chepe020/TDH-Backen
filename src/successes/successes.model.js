import { Schema, model } from "mongoose";

const SuccessesSchema = Schema({
    nameSuccess: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be at most 50 characters long"]
    },
    descriptionSuccess: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [1000, "Name must be at most 1000 characters long"]
    },
    points: {
        type: Number,
        required: [true, "Price is required"]
    },
    amountTasks: {
        type: Number,
        required: [true, "Amount Tasks is required"]
    },
    keeperUser: [{
        userCompletedTask: {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: [true, "User is required"]
            },
            status: {
                type: Boolean
            }
        }
    }],
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Successes", SuccessesSchema);