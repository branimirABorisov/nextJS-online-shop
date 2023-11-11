import { useState } from "react";
import styled from "styled-components"


const Image = styled.img`
width: 100%;
`;

const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
`;

const ImageButton = styled.div`
border: 1px solid #aaa;
${props => props.active ? `
border-color: #ccc
` : `
border-color: transperant;
opacity: .7;
`}
width: 80px;
padding: 3px;
cursor: pointer;
border-radius: 5px;


`;



export default function ProductImages ({images}) {

   const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <Image src={activeImage}/>
            
            <ImageButtons>
                {images.map(image => (
                    <ImageButton 
                    active={image === activeImage}
                    onClick={() => setActiveImage(image)}>
                        <Image src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}