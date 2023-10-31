const { model, Schema, models } = require("mongoose");


const CategorySchema = new Schema ({
    name: {type: String, require: true}
});


export const Category = models.Category || model('Category', CategorySchema);