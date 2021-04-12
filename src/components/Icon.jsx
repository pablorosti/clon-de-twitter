import React from 'react'
import styled from 'styled-components'

export const Icon = () => {
    return (
        <Icono className="fab fa-twitter"></Icono>
    )
}

const Icono = styled.i`
    font-size:50px;
    color:var(--primary);
    margin-bottom:3rem;
`;