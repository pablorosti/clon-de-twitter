import React, {useState} from 'react'
import styled from 'styled-components'
import {Container} from '../elements/Container'
import {Icon} from '../components/Icon';
import {Title} from '../elements/Title';
import {Input} from '../elements/InputLoginAndSignUp'
import {Link, useHistory} from 'react-router-dom';
import {auth, google} from '../firebase/firebaseConfig';
import {Spinner} from '../components/Spinner';
import {ButtonLoginGoogleAndFacebook} from '../elements/ButtonLoginGoogleAndFacebook';
import {IconGoogle} from '../elements/IconGoogle';
import {MessageError} from '../components/MessageError';

export const Login = () => {

    const history = useHistory();

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const [loading, changeLoading] = useState(false);
    const [error, setError] = useState(false)
    const [messageError, changeMessageError] = useState('');

    const handleChange = e => {
        switch (e.target.name) {
            case 'email':
                changeEmail(e.target.value)
                break;
            case 'password':
                changePassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        changeLoading(true)

        //Validations
        const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i
        if(!regex.test(email)){
            changeLoading(false)
            setError(true)
            changeMessageError('Email invilido')
            return
        }
        if(email.length === 0){
            changeLoading(false)
            setError(true)
            changeMessageError('Email obligatorio')
            return
        }
        if(password.length === 0){
            changeLoading(false)
            setError(true)
            changeMessageError('Ingrese una contraseña')
            return
        }

        setError(false)

        //if we pass the validations we signUp
        try {
            await auth.signInWithEmailAndPassword(email, password);
            changeLoading(false)
            history.push('/');
        } catch (error) {
            changeLoading(false)
            
            switch (error.code) {
                case 'auth/email-already-exists':
                    setError(true)
                    changeMessageError('El email con el que usted desea ingresar ya esta en uso');
                    break;
                case 'auth/wrong-password':
                    setError(true)
                    changeMessageError('La contraseña no es valida o el usuario no tiene contraseña');
                    break;
                case 'auth/user-not-found':
                    setError(true)
                    changeMessageError('No hay usuario registrado con ese email');
                    break;
                default:
                    break;
            }
        }
    }

    const handleLoginWithGoogleClick = async () => {

        await auth.signInWithPopup(google);
        history.push('/')

    }

    return (
        <ContainerLogin>
            <Container>
                <Icon/>
                <form onSubmit={handleSubmit}>
                    <Title>Iniciar sesión en Twitter</Title>
                    {
                        error ? <MessageError message={messageError}/> : null
                    }
                    <Input type="text" 
                            placeholder='Correo'
                            name='email'
                            value={email}
                            onChange={handleChange}
                    />
                    <Input type="password" 
                            placeholder='Contraseña'
                            name='password'
                            value={password}
                            onChange={handleChange}
                    />
                    {
                        loading ? <ButtonLogin><Spinner/></ButtonLogin> : <ButtonLogin>Iniciar sesión</ButtonLogin>
                    } 
                </form>

                <DFlex>
                    <Line/>
                    <p>O</p>
                    <Line/>
                </DFlex>
                <ButtonLoginGoogleAndFacebook onClick={handleLoginWithGoogleClick}><IconGoogle className='fab fa-google'></IconGoogle>Iniciar sesión con google</ButtonLoginGoogleAndFacebook>

                <SignUp to={'/registro-usuario'}>Regístrate en Twitter</SignUp>
            </Container>
        </ContainerLogin>
    )
}

const SignUp = styled(Link)`
    color: var(--primary);
    text-decoration:none;
    margin:0 auto;
    font-size:17px;
    display:block;
`;

const ButtonLogin = styled.button`
    display:block;
    margin-bottom:15px;
    text-align:center;
    background:var(--primary);
    padding:var(--padding);
    border-radius:20px;
    border:none;
    outline:none;
    color:white;
    text-decoration:none;
    font-weight:bold;
    width:100%;
    cursor:pointer;
    font-size:15px;
`;
const Line = styled.span`
    border-bottom:solid 1px gray;
    width:40%;
`;
const DFlex = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const ContainerLogin = styled.div`

    @media(min-width:768px){
        width:500px;
        margin:0 auto;
    }
`;