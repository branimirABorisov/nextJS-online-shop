import Center from "./Center";
import ProductsGrid from "./ProductsGrid";



export default function NewProducts({ products }) {
    return (
        <div>
            <Center>
                <h2>New Products</h2>
                <ProductsGrid  products={products}/>
            </Center>
        </div>
    )
}
