import axios from "axios";
import { CartContext } from "../components/Cartcontext";
import Center from "../components/Center"
import Header from "../components/Header"
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import Table from "../components/Table";
import Input from "../components/Input";

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


const ProductInfo = styled.td`
   padding: 10px 0;

`;


const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 7px;
    border: 1px solid #007CC7;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 80px;
        max-height: 80px;
    }

`;

const QuantityLabel = styled.span`
    padding: 0 3px;

`;

const InputGroup = styled.div`
display: flex;
gap: 2px;
`

export default function cart() {

    const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');



    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(res => {
                    setProducts(res.data)
                })
        }

    }, [cartProducts])

    function addQuantity(id) {
        addProduct(id)
    }

    function removeQuantity(id) {
        removeProduct(id)
    }

    let totalPrice = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        totalPrice += price;
    }

    return (
        <div>
            <Header />
            <Center>
                <Wrapper>
                    <Box>
                        <h2>Ordered Products</h2>

                        {!products?.length > 0 && (
                            <h2>The cart is Empty!</h2>
                        )}
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 && products.map((product) => (

                                    <tr>
                                        <ProductInfo>
                                            <ProductImageBox>
                                                <img src={product.images[0]} alt={product.title} />

                                            </ProductImageBox>
                                            {product.title}

                                        </ProductInfo>
                                        <td>
                                            <QuantityLabel>

                                                <button type="button" onClick={() => removeQuantity(product._id)}>-</button>

                                            </QuantityLabel>
                                            {cartProducts.filter(id => id === product._id).length}
                                            <QuantityLabel>

                                                <button type="button" onClick={() => addQuantity(product._id)}>+</button>

                                            </QuantityLabel>
                                        </td>
                                        <td>{(cartProducts.filter(id => id === product._id).length * product.price).toFixed(2)} лв.</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td>Total Price:</td>
                                    <td>{totalPrice.toFixed(2)} лв.</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Box>
                    <Box>
                        <h2>Order Summary</h2>
                        <form method="POST" action="/api/checkout">

                            <InputGroup>
                                <Input type="text" name="firstName" value={firstName} placeholder="First name" onChange={e => setFirstName(e.target.value)} />
                                <Input type="text" name="lastName" value={lastName} placeholder="Last name" onChange={e => setLastName(e.target.value)} />
                            </InputGroup>
                            <Input type="text" name="email" avalue={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            <Input type="text" name="city" value={city} placeholder="City" onChange={e => setCity(e.target.value)} />
                            <Input type="text" name="postCode" value={postCode} placeholder="Postal Code" onChange={e => setPostCode(e.target.value)} />
                            <Input type="text" name="address" value={address} placeholder="Street Address" onChange={e => setAddress(e.target.value)} />
                            <Input type="text" name="phone" value={phone} placeholder="Phone number" onChange={e => setPhone(e.target.value)} />
                            <input type="hidden" name="products" value={cartProducts.join(', ')} />
                            <button type="submit">Proceed to checkout</button>

                        </form>

                    </Box>
                </Wrapper>
            </Center>
        </div>


    )
}