import React, {useState, useEffect} from 'react'
import {NavigationBar} from '../components/NavigationBar'
import {ContainerDesktop} from '../elements/ContainerDesktop';
import styled from 'styled-components';
import {db} from '../firebase/firebaseConfig';
import {useAuth} from '../context/AuthContext';
import {useGetMessage} from '../hooks/useGetMessage';
import {CardMessage} from '../components/CardMessage';
import {SpinnerBlue} from '../components/SpinnerBlue';

export const Message = () => {

    const scroll = () => {
        window.scroll({
            top:5000000000000000000000, 
            left:100,
            behavior: 'smooth'
        })
    }
    useEffect(()=>{
        scroll()
    })
    
    
    
    const {user} = useAuth();
    const [message, setMessage] = useState('');

    const [messages] = useGetMessage();

    const handleSubmit = e => {
        e.preventDefault();

        if(message !== ''){
            db.collection('mensajes').add({
                mensaje:message, 
                avatar: user.photoURL, 
                nombre: user.displayName,
                fecha: Date.now(), 
                fechaUTC: new Date().toString(),
                id: user.uid

            }).then(doc => {
                
                setMessage('')
                window.scroll({
                    top:5000000000000000000000, 
                    left:100,
                    behavior: 'smooth'
                })
            }).catch(error => {
                console.log(error)
            });      
        }  
    }

    return (
        <ContainerDesktop>
            
            {
                messages.length === 0 
                    ? <Loading><SpinnerBlue/></Loading>
                    : messages.map((msg, i) => {
                        return <CardMessage
                                    key={i}
                                    message={msg.mensaje}
                                    avatar={msg.avatar}
                                    name={msg.nombre}
                                    dateUTC={msg.fechaUTC}
                                    id={msg.id}
                        />
                    })
                
            }
            
            <Center>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <Input type='text' 
                            placeholder='Escribe un mensaje'
                            value={message}
                            onChange={(e) => {setMessage(e.target.value)}}
                            autoComplete='off'
                        /> 
                    </label>
                    <Button type='submit'><IconSend className="far fa-paper-plane"></IconSend></Button>
                </Form>
            </Center>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <NavigationBar/>
        </ContainerDesktop>
    )
}

const Form = styled.form`
    position:fixed;
    bottom:45px;
    background:transparent;
    width:100%;
    margin:0 auto 5px auto;
`;
const Input = styled.input`
    width:70vw;
    border-radius:10px;
    border:solid 1px lightgray;
    padding:6px 0 6px 10px;
    outline:none;
    cursor:pointer;
`;
const Button = styled.button`
    width:15vw;
    margin-left:5px;
    background:transparent;
    outline:none;
    border:none;
    border-radius:20px;
    padding:5px;
    background:var(--primary);

    @media(min-width:768px){
        width:14vw;
    }
`;
const IconSend = styled.i`
    font-size:20px;
    color:white;
`;
const Center = styled.div`
    text-align:center;
`;
const Loading = styled.div`
  color: var(--primary);
  text-align:center;
  display: flex;
  width: 100vw;
  height: 20vh;
  justify-content: center;
  align-items: center;

  @media(min-width:768px){
    width:95%;
  }
`;