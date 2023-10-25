const { model, Schema, models } = require("mongoose");

const ProductShema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
})


export const Product = models.Product || model('Product', ProductShema)