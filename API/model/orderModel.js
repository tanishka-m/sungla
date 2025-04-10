import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products: [],
    payment: {},
    buyer: {
        type: Number,
        ref: "user_collection",
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
}, { timestamps: true }
);

//schema validation
const orderSchemaModel = mongoose.model('Order', orderSchema);

export default orderSchemaModel;