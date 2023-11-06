import styled from "styled-components"
import Center from "./Center"
import ProductCard from "./ProductCard";

const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
padding-top: 20px;
padding-bottom: 20px;
gap: 20px;
`;

export default function NewProducts({ products }) {
    return (
        <div>
            <Center>
                <h2>New Products</h2>
                <ProductsGrid>
                    {products.length > 0 && products.map(product => (
                        <ProductCard {...product} />
                    ))}
                </ProductsGrid>
            </Center>
        </div>
    )
}

