import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductsForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();
    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price };
        
        if (_id) {

            await axios.put('/api/products', {...data, _id})

        } else {
            await axios.post('/api/products', data);
        }
        
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="Product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />
            <label>Price</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}

            />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}