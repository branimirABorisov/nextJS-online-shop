import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Categories() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState([]);
    const [editedCategory, setEditedCAtegory] = useState(null);


    useEffect(() => {
        getCategories();
    }, []);

    async function save(e) {
        e.preventDefault();
        const data = { name, parentCategory }
        if (editedCategory) {
            await axios.put('/api/categories', {...data, _id: editedCategory._id})
            setName('');
            setEditedCAtegory(null);
            getCategories();
        } else {
            await axios.post('/api/categories', data);
            setName('');
            getCategories();
        }
        
    }

    function getCategories() {
        axios.get('/api/categories').then(res => {
            setCategories(res.data);
        })
    }


    function editCategory(category) {
        setEditedCAtegory(category);
        setName(category.name);
        setParentCategory(category.parent?._id  )
    }


    return ( 
        <Layout>

            <h1>Categoryes</h1>
            <label>{editedCategory ? `Edit category: ${editedCategory.name}` : 'Add New Category'}</label>
            <form onSubmit={save} className="flex gap-1">
                <input type="text" className="mb-0" onChange={ev => setName(ev.target.value)} value={name} />
                <select className="mb-0" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                    <option value="0">No parent category</option>
                    {categories.length > 0 && categories.map((cat) => (
                        <option value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary">Save</button>
            </form>


            <table className="basic">
                <thead>
                    <tr>
                        <td>Category</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>

                    {categories.length > 0 && categories.map((cat) => (
                        <tr>
                            <td>{cat.name}</td>
                            <td>{cat?.parent?.name}</td>

                            <td>
                                <button onClick={() => editCategory(cat)} className="btn-default mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>

                                    Edit
                                </button>
                                <button className="btn-default mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </Layout>
    )
}