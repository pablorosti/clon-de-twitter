import styled from 'styled-components';

export const Input = styled.input`
    display:block;
    padding:.8rem;
    width:90%;
    margin:.8rem auto;
    font-size:20px;
    outline:none;
    border:solid 1px gray;
    border-radius:5px;
    :focus{
        border:solid 2px var(--primary)
    }
`;
