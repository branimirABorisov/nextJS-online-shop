import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import { Order } from "../../models/Order";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('Neet to be POST req!');
        return;
    }

    const { firstName, lastName, email, city, postCode, address, phone, products } = req.body;

    await mongooseConnect()
    const productsIds = products.split(', ');
    const uniqueIds = [...new Set(productsIds)];

    const productsInfo = await Product.find({ _id: uniqueIds });

    let items = [];

    for (const productId of uniqueIds) {
        const info = productsInfo.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && info) {

            items.push({
                quantity, 
                price_data: {
                    currency: 'BGN',
                    product_data: {name: info.title},
                    amount: quantity * info.price
                }
            })
        }

    }

    const orderDoc = await Order.create({
        items,
        firstName,
        lastName,
        email,
        city,
        postCode,
        address,
        phone
    })

    res.json(orderDoc)
   
}




