import React from 'react'
import styled from 'styled-components';

export const MessageError = ({message}) => {
    return (
        <Message>{message}</Message>
    )
}
const Message = styled.p`
    color:red;
`;