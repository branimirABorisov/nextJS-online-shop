import styled from "styled-components"
import Center from "./Center"

const StyledImg = styled.img`
    max-width: 100%;
    margin-top: 10px;
`


export default function Banner () {

    return (
        <Center>
        <StyledImg src="https://gshocknz.com/cdn/shop/files/GMB2100_ImageBanner__kv_pc.jpg?v=1658955536" alt="banner"/>
        </Center>
    )
}