import styled from "styled-components"

const MainCard = styled.div`
background-color: white;
padding: 20px;
display: flex;
flex-direction: column;
text-align: center;
border-radius: 7px;
font-size: 14px;

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
    font-weight: 600;
`;

const Title = styled.h2`
    font-weight: normal;
    font-size: .8rem;
    margin: 0;
`

const StyledButton = styled.button`
    border: 0;
    padding: 10px 15px;
    border-radius: 7px;
    color: white;
    background-color: #203647;
    cursor: pointer;
`



export default function ProductCard({ _id, title, price, images }) {
    return (
        <MainCard>
            <img src={images[0]} alt="image" />
            <Title>
                {title}
            </Title>
            <CardFooter>
                {price.toFixed(2)} лв.
                <StyledButton type="button">
                    Add to Cart
                </StyledButton>
            </CardFooter>
        </MainCard>
    )
}