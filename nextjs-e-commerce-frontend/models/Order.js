const { Schema, model } = require("mongoose");

const OrderShema = new Schema({
    items: Object,
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    city: {type:String},
    postCode: {type: String},
    address: {type: String},
    phone: {type: String}
})



export const Order = model?.Order || model('Order', OrderShema);