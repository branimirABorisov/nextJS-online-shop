import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handle(req, res) {

    const { method } = req;
    await mongooseConnect();
    await isAdmin(req, res);

    if (method === 'GET') {

        if(req.query?.id) {
            res.json(await Product.findById({_id: req.query.id}))
        } else {
            res.json(await Product.find());
        }
    }


    if (method === 'POST') {
        const {title, description, price, images, category, properties} = req.body;
        const NewProduct = await Product.create({
            title, 
            description, 
            price,
            images,
            category,
            properties
        })

        res.json(NewProduct);
    }


    if(method === 'PUT') {
        const {title, description, price, images, category, properties, _id} = req.body;
        await Product.updateOne ({_id}, {title, description, price, images, category, properties});
        res.json('ok');

    }

    if (method === 'DELETE') {
        if(req.query?.id) {
            await Product.deleteOne({_id: req.query?.id});
            res.json(true);
        }

    }


}