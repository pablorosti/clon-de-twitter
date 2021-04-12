import React from 'react'
import { useParams } from 'react-router-dom'
import {IndividualCardTweet} from '../components/IndividualCardTweet';
import {useGetTweetForId} from '../hooks/useGetTweetForId';
import {ContainerDesktop} from '../elements/ContainerDesktop';

export const Tweet = () => {

    const {id} = useParams();

    const [tweet] = useGetTweetForId(id);
    
    return (
        <ContainerDesktop>
            
            <IndividualCardTweet
                avatar={tweet.avatar}
                nombre={tweet.nombre}
                tweet={tweet.tweet}
                image={tweet.urlImage}
                fecha={tweet.fecha}
                retweet={tweet.retweet}
                likes={tweet.likes}
            /> 
            
        </ContainerDesktop>
    )
}