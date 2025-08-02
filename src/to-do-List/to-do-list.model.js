import { Schema, model } from "mongoose";

const ToDoListSchema = Schema(
    {
        taskName: {
            type: String,
            required: [true, 'Task name is required'],
            maxLength: [50, 'Task name must be at most 50 characters long']
        },
        taskDescription: {
            type: String,
            default: ''
        },
        dueDate: {
            type: Date,
            required: [true, 'Due date is required']
        },
        priority: {
            type: String,
            enum: ['Normal', 'Medium', 'Important'],
            default: 'Normal'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'CategorySubject',
            required: [true, 'Category Subject is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        taskStatus: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending'
        },
        imageUrl:{
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('ToDoList', ToDoListSchema);