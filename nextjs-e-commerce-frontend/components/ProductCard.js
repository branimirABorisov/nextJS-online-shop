import { useContext } from "react";
import styled from "styled-components"
import { CartContext } from "./Cartcontext";
import Link from "next/link";


const MainCard = styled.div`
background-color: white;
padding: 20px;
display: flex;
flex-direction: column;
text-align: center;
border-radius: 7px;
font-size: 14px;
text-decoration: none;

img{
    max-width: 100%;

}
`;


const CardFooter = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
`;

const Title = styled.h2`
    font-weight: normal;
    font-size: .8rem;
    margin: 0;
`

const StyledButton = styled.button`
    border: 0;
    padding: 7px 15px;
    border-radius: 7px;
    color: white;
    background-color: #203647;
    display: inline-flex;
    gap: 3px;
    svg {
        height: 18px;
    }
    cursor: pointer;
`

const StyledLink = styled.a`
text-decoration: none;
color: black;

`;





export default function ProductCard({ _id, title, price, images }) {
    const {addProduct} = useContext(CartContext);

    function addToCard () {
        addProduct(_id);
    }

    const url = '/product/' + _id;

    return (
        <MainCard>
            <Link href={url}><img src={images[0]} alt="image" /></Link>
            <StyledLink href={url}><Title>{title}</Title></StyledLink>
            
            
            <CardFooter>
                {price.toFixed(2)} лв.
                <StyledButton type="button" onClick={addToCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
        
                </StyledButton>
            </CardFooter>
        </MainCard>
    )
}