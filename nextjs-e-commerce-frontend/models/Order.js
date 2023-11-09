import { model, Schema, models } from "mongoose";

const OrderShema = new Schema({
    items: Object,
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    city: {type:String},
    postCode: {type: String},
    address: {type: String},
    phone: {type: String},
    orderStatus: { 
        type: String,
        enum: ["new", "pending", "cancel", "complete"],
        default: "new"
    }
}, { timestamps: true })



export const Order = models?.Order || model('Order', OrderShema);