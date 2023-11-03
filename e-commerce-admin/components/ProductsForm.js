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
    images: existingImages,
    category: existingCategory,
    properties: existingProperties
}) {

    const [category, setCategory] = useState(existingCategory || '');
    const [productProperties, setProductProperties] = useState(existingProperties || {})
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([])
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setCategories(res.data);
        })
    }, [])


    async function saveProduct(e) {
        e.preventDefault();
        const data = { 
            title, description, price, images, category, 
            properties: productProperties 
        };


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


    function updateImagesOrder(images) {
        setImages(images);
    }

    function setProductProp (propName, value) {
        setProductProperties(prev => {
            const newProductProps = {...prev}
            newProductProps[propName] = value;
            return newProductProps;
        })
    }


    const propertiesToFill = [];

    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCategory = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCategory.properties);
            catInfo = parentCategory;
        }
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
            <label>Category</label>

            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map((cat) => (
                    <option value={cat._id}>{cat.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div className="flex gap-1">
                    <div>
                        {p.name}
                    </div>
                    <select value={productProperties[p.name]} onChange={(ev) => setProductProp(p.name, ev.target.value)}>
                        {p.values.map(v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select> 
                </div>
            ))}
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