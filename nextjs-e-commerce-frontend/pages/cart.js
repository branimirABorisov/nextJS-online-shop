import { CartContext } from "@/components/Cartcontext";
import Center from "@/components/Center"
import Header from "@/components/Header"
import { useContext } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 30px;
    margin-top: 50px;
`;

const Box = styled.div`
background-color: white;
border-radius: 7px;
padding: 30px;

`;

export default function cart() {

    const { cartProducts } = useContext(CartContext);
    return (
        <div>
            <Header />
            <Center>
                <Wrapper>
                    <Box>
                        <h2>Ordered Products</h2>
                        {cartProducts.length > 0 && cartProducts.map((cartProduct) => (
                            <p>{cartProduct}</p>
                        ))}
                    </Box>
                    <Box>
                        <h2>Order Summary</h2>
                        <input type="text" placeholder="Adress" />
                        <input type="text" placeholder="Adress1" />
                        <button type="button">Proceed to checkout</button>
                    </Box>
                </Wrapper>
            </Center>
        </div>


    )
}