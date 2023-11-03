import mongoose, {model, Schema, models} from 'mongoose';

const ProductShema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    images: [{type: String}],
    category: {type:mongoose.Types.ObjectId, ref: 'Category'},
    properties: {type: Object}
})


export const Product = models.Product || model('Product', ProductShema)