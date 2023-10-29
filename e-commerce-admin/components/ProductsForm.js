import { uploadImages } from "@/firebase";
import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";


export default function ProductsForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images }) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const router = useRouter();
    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price };

        if (_id) {

            await axios.put('/api/products', { ...data, _id })

        } else {
            await axios.post('/api/products', data);
        }

        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products')
    }


    useEffect(() => {
        if (imageFile === null) return
        console.log('useEffect', imageFile.name);
        uploadImages(imageFile)
    }, [imageFile])

    
    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="Product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
            <label>Photos</label>
            <div className="mb-2">
                <label className="border w-24 h-24 cursor-pointer flex items-center flex-col justify-center rounded-md bg-admin-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>

                    Upload
                    <input type="file" onChange={(event) => {setImageFile(event.target.files[0])}} className="hidden" />
                </label>
            </div>
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