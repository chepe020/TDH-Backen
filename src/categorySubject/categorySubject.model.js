    import { Schema, model } from "mongoose";

    const CategorySubjectSchema = Schema({
        nameSubject: {
            type: String,
            required: false,
            maxLength: [50, 'Name must be at most 50 characters long'],
            lowercase: true,
            trim: true
        },
        descriptionSubject: {
            type: String,
            required: false,
            maxLength: [500, 'Description must be at most 500 characters long']
        },
        keeperUser: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
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

    export default model('CategorySubject', CategorySubjectSchema)