import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th {
        text-align: left;
        text-transform: uppercase;
        color: #007CC7;
    }
    td {
        text-align: center;
        border-top: 1px solid #007CC7;
    }
`;

export default function Table(props) {
    return <StyledTable {...props} />
}