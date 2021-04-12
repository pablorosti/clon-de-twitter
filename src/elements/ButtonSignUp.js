import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ButtonSignUp = styled(Link)`
    display:block;
    margin-bottom:15px;
    text-align:center;
    background:var(--primary);
    padding:var(--padding);
    border-radius:20px;
    outline:none;
    color:white;
    text-decoration:none;
    font-weight:bold;

    @media(min-width:768px){
        width:300px;
        margin:1rem auto;
    }
`;

export default ButtonSignUp;