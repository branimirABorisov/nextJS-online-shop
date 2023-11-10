import Header from "../components/Header";
import Center from "../components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "../models/Product";
import ProductsGrid from "@/components/ProductsGrid";

export default function Products({products}) {
    return (
        <div>
            <Header />
                <Center>
                    <h1>Product page</h1>
                    <ProductsGrid products={products}/>
                </Center>
        </div>

    )
}


export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort: {'_id': -1}});
    return {props:{
        products: JSON.parse(JSON.stringify(products))
    }}
}

