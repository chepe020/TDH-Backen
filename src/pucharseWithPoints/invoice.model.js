import { Schema, model } from "mongoose";

const InvoiceSchema = Schema({
    invoice : {
        type: Object
    },
    total: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false       
});

export default model("Invoice", InvoiceSchema);