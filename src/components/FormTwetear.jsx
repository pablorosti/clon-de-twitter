import React, {useState} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {db} from '../firebase/firebaseConfig';
import {Spinner} from './Spinner';
import {ButtonBack} from '../elements/ButtonBack';
import { uid } from 'uid';
import {storage} from '../firebase/firebaseConfig';
import {MessageError} from '../components/MessageError';


export const FormTwetear = () => {
    const history = useHistory();
    const {user} = useAuth();

    const [tweet, changeTweet] = useState('')
    const [loading, changeLoading] = useState(false);
    const [image, setImage] = useState();
    const [error, setError] = useState(false);
    const [countDown, setCountDown] = useState(280);

    const idUnico = uid(16);

    const handleClick = () => {
        history.push('/')
    }

    const handleChange = e => {
        if(e.target.name === 'tweet'){
            changeTweet(e.target.value)
        }else if(e.target.name === 'file'){
            setError(false);
            setImage(e.target.files[0]);
        }
    }
    const handleKeyDown = e => {
        if(e.key === 'Backspace'){
            if(countDown >= 280){
                setCountDown(280)
            }else{
                setCountDown(countDown + 1)
            }
        }else{
            setCountDown(countDown - 1)
        }
    }

    const addTweet = async () => {
        try {

            const chain = image.type;
            const jpeg = 'jpeg';
            const png = 'png';
            const gif = 'gif';
            const jpg = 'jpg';

            const indexJpeg = chain.indexOf(jpeg);
            const indexPng = chain.indexOf(png);
            const indexgif = chain.indexOf(gif);
            const indexJpg = chain.indexOf(jpg);

            if(indexJpeg >= 0 || indexPng >= 0 || indexgif >= 0 || indexJpg >= 0){
                const newRef = storage.ref('imagenes').child(image.name); // nombre del archiv
                await newRef.put(image);
                const urlImagen = await newRef.getDownloadURL();

                try {

                    if(countDown >= 0){
                        if(user.uid === 'YpY4HvtxonVnNqVbLe3JfERlSCi1' || user.uid === 'S77i6ssj8RPi8PQWuJlJZuuMsdU2'){
                            await db.collection('tweets')
                            .add({
                                avatar:user.photoURL,
                                tweet:tweet, 
                                nombre:user.displayName,
                                id: user.uid, 
                                fecha: Date.now(),
                                fechaString: new Date().toString(), 
                                idUnico: idUnico, 
                                likes:0, 
                                retweet:0,
                                urlImage:urlImagen, 
                                verificado:true
                            })
                            changeTweet('');
                            changeLoading(false);
                            history.push('/')
                            return
                        }
                        await db.collection('tweets')
                        .add({
                            avatar:user.photoURL,
                            tweet:tweet, 
                            nombre:user.displayName,
                            id: user.uid, 
                            fecha: Date.now(),
                            fechaString: new Date().toString(), 
                            idUnico: idUnico, 
                            likes:0, 
                            retweet:0,
                            urlImage:urlImagen, 
                            verificado:false
                        })
                        changeTweet('');
                        changeLoading(false);
                        history.push('/')
                    }else{
                        changeLoading(false);
                    }
                    
                } catch (error) {
                    console.log('ocurrio un error')
                }
            }else{
                changeLoading(false);
                setError(true);
            }

        } catch (error) {
            try {
                if(countDown >= 0){
                    if(user.uid === 'YpY4HvtxonVnNqVbLe3JfERlSCi1' || user.uid === 'S77i6ssj8RPi8PQWuJlJZuuMsdU2'){
                        await db.collection('tweets')
                        .add({
                            avatar:user.photoURL,
                            tweet:tweet, 
                            nombre:user.displayName,
                            id: user.uid, 
                            fecha: Date.now(), 
                            fechaString: new Date().toString(),
                            idUnico: idUnico, 
                            likes:0, 
                            retweet:0,
                            urlImage:null, 
                            verificado:true
                        })
                        changeTweet('');
                        changeLoading(false);
                        history.push('/')
                        return
                    }
                    await db.collection('tweets')
                    .add({
                        avatar:user.photoURL,
                        tweet:tweet, 
                        nombre:user.displayName,
                        id: user.uid, 
                        fecha: Date.now(), 
                        fechaString: new Date().toString(),
                        idUnico: idUnico, 
                        likes:0, 
                        retweet:0,
                        urlImage:null, 
                        verificado:false
                    })
                    changeTweet('');
                    changeLoading(false);
                    history.push('/')
                }else{
                    changeLoading(false);
                }
                
    
            } catch (error) {
                console.log('ocurrio un error')
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(tweet !== ''){
            changeLoading(true);
            addTweet();
        }
    }

    return (
        <>
            <ButtonBack onClick={handleClick}><i className="fas fa-arrow-left"></i></ButtonBack>
            <Container>
                {
                    user.photoURL ? <IconUser src={user.photoURL} alt=''/> : <IconUser src='data:image/jpeg;base64,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' alt=""/>
                }
                
                <form onSubmit={handleSubmit}>
                    <Input  
                            placeholder='??Qu?? est?? pasando?'
                            name='tweet'
                            value={tweet}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoComplete='off'
                
                    />
                    <hr/>
                    <input 
                        type="file"
                        name='file'
                        onChange={handleChange}
                    />
                    {
                        error ? <MessageError message={'Formato no admitido'}/> : null
                    }
                    <DFlex>
                        <div>
                            <Icon className="far fa-image"></Icon>
                            <Icon className="fas fa-gift"></Icon>
                            <Icon className="fas fa-poll-h"></Icon>
                            <Icon className="far fa-smile"></Icon>
                        </div>
                        <ContainerCountDownAndButton>
                            
                            {
                                countDown <= 280 && countDown >= 100
                                    ? <CountDown>{countDown}</CountDown> 
                                    : (countDown < 100 && countDown > 0 
                                        ? <CountDownYellow>{countDown}</CountDownYellow> 
                                        : <CountDownRed>{countDown}</CountDownRed> )
                                
                            }
                            {
                                loading ? <Button disabled='on'><Spinner/></Button> : <Button type='submit'>Twetear</Button>
                            }
                        </ContainerCountDownAndButton>
                        
                    </DFlex>
                </form>
            </Container>
        </>
    )
}
const DFlex = styled.div`
    display:flex;
    justify-content:space-between;
    padding:10px 0 0 0;
    align-items:center;
`;
const ContainerCountDownAndButton = styled.div`
    display: flex;
    align-items:center;
`;
const Container = styled.div`
    display:grid;
    grid-template-columns:1fr 7fr;
    gap:1rem;
    border:solid 1px lightgray;
    border-left:0;
    border-right:0;
    padding:10px;
    margin-bottom:20px;
    
`;
const IconUser = styled.img`
    border-radius:50%;
    height:35px;
    width:35px;
`;
const Input = styled.textarea`
    width:90%;
    padding-top:20px;
    padding-bottom:40px;
    border:none;
    outline:none;
    font-size:15px;
    resize: none;
`;
const Button = styled.button`
    background:var(--primary);
    border:none;
    padding:10px 20px;
    color:white;
    border-radius:30px;
    font-weight:bold;
    outline:none;
    width:100px;
`;
const Icon = styled.i`
    color:var(--primary);
    font-size:1.3rem;
    margin-right:7px;
`;
const CountDown = styled.p`
    font-size:15px;
    color:var(--primary);
    margin-right:1rem;
`;
const CountDownYellow = styled.p`
    font-size:15px;
    color:orange;
    margin-right:1rem;
`;
const CountDownRed = styled.p`
    font-size:15px;
    color:red;
    margin-right:1rem;
`;