import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function deleteProductPage() {
    const [productInfo, setProductInfo] = useState();

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/products?id=' + id).then(res => {
            setProductInfo(res.data);
        })

    }, [id])


    function goBack() {
        router.push('/products');
    }

    async function deleteProduct () {
        await axios.delete('/api/products?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <div className="flex gap-2 justify-center">
                
            <h1>Do you really want to delete {productInfo?.title}?  </h1>
            </div>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProduct}>YES</button>
                <button className="btn-default" onClick={goBack}>NO</button>
            </div>

        </Layout>
    )
}