import React from 'react'
import styled from 'styled-components';

export const CardNews = ({title, img, url}) => {
    return (
        <Card>
            <Container>
                    <Img src={img} alt=""/>
                    <Title>{title}<a href={url} target='_black'>ir al sitio web</a></Title>  
            </Container>
            
        </Card>
    )
}
const Card = styled.div`
    height:200px;
    width:100%;
    
`;
const Img = styled.img`
    height:150px;
    width:100%;
`;
const Container = styled.div`
    position: relative;
`;
const Title = styled.h3`
    position:absolute;
    bottom:0;
    color:white;
    background:rgba(128, 128, 128, 0.666);
    padding:10px 0;
    font-weight:bold;
    min-width:100%;
    margin-bottom:5px;

    & > a {
        margin-top:5px;
        margin-left:10px;
        font-size:14px;
    }
`;