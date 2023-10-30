import { uploadImages } from "@/firebase";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";

import Spinner from "./Spinner";



export default function ProductsForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages }) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();
    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price, images };

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

    async function uploadImages(e) {
        const files = e.target?.files;

        if (files?.length > 0) {

            setIsUploading(true);

            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }

            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })

            setIsUploading(false);

        }
    }

    
    function updateImagesOrder (images) {
        setImages(images);
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
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-2">
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-md" />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-1 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="border w-24 h-24 cursor-pointer flex items-center flex-col justify-center rounded-md bg-admin-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>

                    Upload
                    <input type="file" onChange={uploadImages} className="hidden" />
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