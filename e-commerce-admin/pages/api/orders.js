import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {

    const { method } = req;
    await mongooseConnect();
    await isAdmin(req, res);

    if (method === 'GET') {
        if(req.query?.id) {
            res.json(await Order.findById({_id: req.query.id}))
        } else {
            res.json(await Order.find());
        }
    }
} 
