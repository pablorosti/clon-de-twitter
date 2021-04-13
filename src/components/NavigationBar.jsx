import React from 'react'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const NavigationBar = () => {
    return (
        <Container>
            <NavLink exact to={'/'}><Icon className="fas fa-home"></Icon></NavLink>
            <NavLink to={'/buscar'}><Icon className="fas fa-search"></Icon></NavLink>
            <NavLink to={'/notificaciones'}><Icon className="fas fa-bell"></Icon></NavLink>
            <NavLink to={'/mensajes'}><Icon className="far fa-envelope"></Icon></NavLink>
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    position:fixed;
    bottom:0;
    border:solid 1px lightgray;
    border-left:0;
    border-right:0;
    width:100%;
    background:white;

    @media(min-width:768px){
        width:500px;
        margin:0 auto;
    }
    
`;
const Icon = styled.i`
    font-size:20px;
    color:black;
    padding:10px;
`;