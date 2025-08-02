import { Schema, model } from "mongoose";

const ShoppingCartSchema = Schema({
    keeperProduct: [{
        product : {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        amountProduct: {
            type: Number,
        }
    }],
    keeperUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
}); 

export default model("ShoppingCart", ShoppingCartSchema);