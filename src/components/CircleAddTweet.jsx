import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

export const CircleAddTweet = () => {
    return (
        <ButtonLink to={'/tweetear'}>
            <Circle>
                <i className="fas fa-feather-alt">+</i>
            </Circle>
        </ButtonLink>
        
    )
}
const Circle = styled.div`
    background:var(--primary);
    height:20px;
    width:20px;
    position:fixed;
    bottom:70px;
    right:10px;
    border-radius:50%;
    padding:25px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    @media(min-width:768px){
        right:150px;
    }
    @media(min-width:800px){
        right:180px;
    }
    @media(min-width:850px){
        right:200px;
    }
    @media(min-width:900px){
        right:220px;
    }
    @media(min-width:950px){
        right:240px;
    }
    @media(min-width:1000px){
        right:260px;
    }
    @media(min-width:1050px){
        right:280px;
    }
    @media(min-width:1100px){
        right:300px;
    }
`;
const ButtonLink = styled(Link)`
    color:white;
`;