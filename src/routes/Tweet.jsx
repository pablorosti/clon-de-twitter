import React from 'react'
import { useParams } from 'react-router-dom'
import {IndividualCardTweet} from '../components/IndividualCardTweet';
import {useGetTweetForId} from '../hooks/useGetTweetForId';
import {ContainerDesktop} from '../elements/ContainerDesktop';
import {CommentTweet} from '../components/CommentTweet';
import {CardComment} from '../components/CardComment';
import {useGetCommentTweetForId} from '../hooks/useGetCommentTweetForId';

export const Tweet = () => {

    const {id} = useParams();

    const [tweet] = useGetTweetForId(id);
    const [comment] = useGetCommentTweetForId(id);

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
                fechaString={tweet.fechaString}
            /> 
 
            <CommentTweet id={id}/>

            {
                comment !== undefined
                    ? 
                        comment.map(com => {
                            return <CardComment
                                    key={com.docId}
                                    id={com.docId}
                                    avatar={com.avatar}
                                    name={com.nombre}
                                    comment={com.comentario}
                                    date={com.fecha}
                                    likes={com.likes}
                                    retweet={com.retweet}
                            />
                        })
                        
                    : null
            }

        </ContainerDesktop>
    )
}
