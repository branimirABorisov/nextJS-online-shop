import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products () {
    return (
        <Layout>
            <Link className='bg-lighter-blue text-admin-white p-2 rounded-lg' href={'/products/new'}>Add new product</Link>
        </Layout>
    )
}