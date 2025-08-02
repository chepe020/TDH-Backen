import { Schema, model } from "mongoose";

const ProductSchema = Schema({
    nameProduct: {
        type: String,
        required: [true, "The content is required"],
        maxLength: [50, "Name must be at most 50 characters long"]
    },
    descriptionProduct: {
        type: String,
        required: [true, "The content is required"],
        maxLength: [1000, "Name must be at most 1000 characters long"]
    },
    pricePoints: {
        type: Number,
        required: [true, "Price is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Product", ProductSchema);