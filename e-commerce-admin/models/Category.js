const { model, Schema, models } = require("mongoose");


const CategorySchema = new Schema ({
    name: {type: String, require: true},
    parent: {type: Schema.Types.ObjectId, ref: 'Category'}
});


export const Category = models.Category || model('Category', CategorySchema);