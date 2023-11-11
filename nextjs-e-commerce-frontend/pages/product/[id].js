import styled from "styled-components"
import Center from "../../components/Center"
import Header from "../../components/Header"
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import WhiteBox from "../../components/WhiteBox";
import ProductImages from "../../components/ProductImages";
import { useContext } from "react";
import { CartContext } from "@/components/Cartcontext";


const Title = styled.h1`
    font-size: 1.5rem;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;

`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Price = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    color: #007CC7;
`;


const AddToCartButton = styled.button`
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 20px;
    color: white;
    border: 0px;
    padding: 6px 17px;
    border-radius: 7px;
    background-color: #12232E;
    svg{
        width: 35px;
    }
`;

export default function ProductPage({ product }) {
    const { addProduct } = useContext(CartContext)
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>{product.price} лв.</Price>
                            </div>
                            <div>
                                <AddToCartButton type="button"
                                    onClick={() => addProduct(product._id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                    </svg>

                                    Add to cart</AddToCartButton>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    )
}


export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

