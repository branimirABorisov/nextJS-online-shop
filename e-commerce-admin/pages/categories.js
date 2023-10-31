import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');

    async function save(e) {
        e.preventDefault();
        
       await axios.post('/api/categories', {name});
       setName('');
    }

    return (
        <Layout>

            <h1>Categoryes</h1>
            <label>Add New Category</label>
            <form onSubmit={save} className="flex gap-1">
                <input type="text" className="mb-0" onChange={ev => setName(ev.target.value)}/>
                <button type="submit" className="btn-primary">Save</button>
            </form>

        </Layout>
    )
}