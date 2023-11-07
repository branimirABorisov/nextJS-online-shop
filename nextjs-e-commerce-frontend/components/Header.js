import Link from "next/link"
import styled from "styled-components"
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./Cartcontext";

const StyledHeader = styled.header`
    background-color: #12232E;
`;

const Logo = styled(Link)`
   color: #EEFBFB;
   text-decoration: none;
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 0;
`

const NavLinks = styled(Link)`
    color: #EEFBFB;
    text-decoration: none;

`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`


export default function Header() {

    const { cartProducts} = useContext(CartContext);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Casio Shop</Logo>

                    <StyledNav>
                        <NavLinks href={'/'}>Home</NavLinks>
                        <NavLinks href={'/products'}>All Products</NavLinks>
                        <NavLinks href={'/categories'}>Casio Series</NavLinks>
                        <NavLinks href={'/account'}>My Account</NavLinks>
                        <NavLinks href={'/cart'}>CART ({cartProducts.length})</NavLinks>
                    </StyledNav>
                </Wrapper>

            </Center>
        </StyledHeader>
    )
}