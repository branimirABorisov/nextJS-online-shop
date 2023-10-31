import { Category } from "@/models/Category";

export default async function handle(req, res) {

    const { method } = req;

    if (method === 'POST') {
        const { name } = req.body;
        const newCategory = await Category.create({ name });
        res.json(newCategory);
    }
}