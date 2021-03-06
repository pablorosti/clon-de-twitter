import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useTimeAgo} from '../hooks/useTimeAgo';
//import {deleteTweet} from '../firebase/deleteTweet';
//import {useGetTweetsUser} from '../hooks/useGetTweetsUser';


export const CardComment = ({avatar, name, id, date,  likes, retweet, comment}) => {

    const timeAgo = useTimeAgo(date)

    return (
        < >
            <Card>
                {
                    avatar  
                        ? <Img src={avatar} alt=""/> 
                        : <Img src='data:image/jpeg;base64,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' alt=""/>
                }
                
                <div>
                    <DFlex>
                        <div>
                            <Name>{name}</Name>
                            
                            <P>.</P>
                            <Date>{timeAgo}</Date>
                        </div>
                        
                    </DFlex>
                    
                    <Tweet>{comment}</Tweet>
                    
                    <DFlex>
                        <ButtonComment><i className="far fa-comment"></i></ButtonComment>
                        <ButtonRetweet><i className="fas fa-retweet"></i>{retweet ? <Amount> {retweet}</Amount> : null}</ButtonRetweet>
                        <ButtonLike ><i className="far fa-heart"></i>{likes ? <Amount> {likes}</Amount> : null}</ButtonLike>
                        <Button><i className="fas fa-share"></i></Button>
                    </DFlex>
                </div>
                
            </Card>
        </>
    )
}

const Card = styled.div`
    border-bottom:solid 1px lightgray;
    width:100%;
    padding-top:10px;
    padding-bottom:10px;
    display:grid;
    grid-template-columns:1fr 7fr .3fr;
    gap:10px;

    :hover{
        background:rgb(243, 241, 241);
    }
`;
const Img = styled.img`
    border-radius:100%;
    width:40px;
    height:40px;
    margin-top:10px;
    margin-left:10px;
`;
const Name = styled.h3`
    font-size:1rem;
    text-transform:capitalize;
    margin-bottom:5px;
`;
const Tweet = styled.p`
    font-size:1rem;
    margin-bottom:13px;
    color:var(--gray);
`;
const DFlex = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;

    & > i {
        color:gray;
        cursor:pointer;
    }
    & > div {
        display:flex;
    }
`;
const ButtonComment = styled(Link)`
    positon:absolute;
    background:transparent;
    outline:none;
    border:none;
    cursor:pointer;
    color:gray;
`;
const ButtonRetweet = styled.button`
    background:transparent;
    outline:none;
    border:none;
    cursor:pointer;
    color:gray;
    display:flex;
    align-items:center;

    :hover{
        color:rgb(51, 182, 51);
    }
`;
const ButtonLike = styled.button`
    background:transparent;
    outline:none;
    border:none;
    cursor:pointer;
    color:gray;
    display:flex;
    align-items:center;

    
`;
const Button = styled.button`
    background:transparent;
    outline:none;
    border:none;
    cursor:pointer;
    color:gray;
`;
const Date = styled.p`
    margin-left:10px;
    color:gray;
    font-size:15px;
    margin-top:1px;
`;
const P = styled.p`
    margin-left:5px;
    
`;
const Amount = styled.p`
    margin-left:3px;
`;