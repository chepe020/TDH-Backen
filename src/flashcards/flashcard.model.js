import { Schema, model } from "mongoose";

const FlashcardSchema = Schema({
    
    question: {
        type: String,
        required: [true, "Question is required"],
        maxLength: [200, "Question must be at most 200 characters long"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        maxLength: [200, "Answer must be at most 200 characters long"]
    },
    keeperCategorySubject: {
        type: Schema.Types.ObjectId,
        ref: 'CategorySubject',
        required: [true, "Category Subject is required"]
    },
    keeperUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Flashcard", FlashcardSchema);