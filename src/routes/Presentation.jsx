import React from 'react'
import styled from 'styled-components';
import {Container} from '../elements/Container'
import {Icon} from '../components/Icon';
import {Title} from '../elements/Title';
import ButtonSignUp from '../elements/ButtonSignUp';
import ButtonLogin from '../elements/ButtonLogin';

export const Presentation = () => {
    return (
        <>
            <Center>
                <Container>
                    <Icon/>
                    <Title>Lo que está pasando ahora</Title>
                    <Subtitle>Únete a Twitter hoy mismo</Subtitle>
                    
                    <ButtonSignUp to={'/registro-usuario'}>Registrate</ButtonSignUp>
                    <ButtonLogin to={'/login'}>Iniciar sesión</ButtonLogin>  
                    
                </Container>
            </Center>
            <div className='img'></div>
        </>
    )
}

const Subtitle = styled.h3`
    margin-bottom:1rem;
    font-weight:bold;
`;
const Center = styled.div`
    text-align:center;
`;