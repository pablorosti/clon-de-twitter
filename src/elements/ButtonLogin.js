import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ButtonLogin = styled(Link)`
    display:block;
    text-align:center;
    background:white;
    padding:var(--padding);
    border-radius:20px;
    outline:none;
    color:rgb(0, 170, 255);
    text-decoration:none;
    border:solid 1px var(--primary);
    font-weight:bold;

    @media(min-width:768px){
        width:300px;
        margin:1rem auto;
    }
`;

export default ButtonLogin;