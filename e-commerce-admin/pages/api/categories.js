import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {

    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { name, parentCategory } = req.body;
        const newCategory = await Category.create({ name, parent: parentCategory });
        res.json(newCategory);
    }


    if (method === 'GET') {
        if(req.query?.id) {
            res.json(await Category.findById({_id: req.query.id}))
        } else {
            res.json(await Category.find().populate('parent'));
        }
    }

    if (method === 'PUT') {
        const { name, parentCategory, _id } = req.body;
        const newCategory = await Category.updateOne({_id}, { name, parent: parentCategory });
        res.json(newCategory);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok');

    }
}