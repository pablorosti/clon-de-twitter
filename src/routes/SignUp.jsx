import React, {useState} from 'react'
import styled from 'styled-components'
import {Link, useHistory} from 'react-router-dom';
import {Container} from '../elements/Container';
import {Title} from '../elements/Title';
import {Input} from '../elements/InputLoginAndSignUp';
import {Icon} from '../components/Icon';
import { auth, google } from '../firebase/firebaseConfig';
import {Spinner} from '../components/Spinner';
import {ButtonLoginGoogleAndFacebook} from '../elements/ButtonLoginGoogleAndFacebook';
import {IconGoogle} from '../elements/IconGoogle';
import {MessageError} from '../components/MessageError';

export const SignUp = () => {

    const history = useHistory();

    const [name, changeName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [password2, changePassword2] = useState('');
    const [date, changeDate] = useState(new Date());

    const [loading, changeLoading] = useState(false);
    const [error, setError] = useState(false)
    const [messageError, changeMessageError] = useState('');

    const handleChange = e => {
        switch (e.target.name) {
            case 'name':
                changeName(e.target.value)
                break;
            case 'email':
                changeEmail(e.target.value)
                break;
            case 'password':
                changePassword(e.target.value)
                break;
            case 'password2':
                changePassword2(e.target.value)
                break;
            case 'date':
                changeDate(e.target.value)
                break;                                                 
            default:
                break;
        }
    }
 
    const handleSubmit = async e => {
        e.preventDefault();

        changeLoading(true);
        //Validations
        if(name.length === 0 || email.length === 0 || password.length === 0 || password2.length === 0){
            changeLoading(false)
            setError(true)
            changeMessageError('Todos los campos son obligatorios')
            return
        }
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
            changeMessageError('El email obligatorio')
            return
        }
        if(password !== password2){
            changeLoading(false)
            setError(true)
            changeMessageError('Las contraseñas deben ser iguales')
            return
        }

        setError(false)

        //if we pass the validations we signUp
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                user.user.updateProfile({
                    //aqui guardas los componentes
                           displayName: name
                })
            });
            changeLoading(false);
            history.push('/');
        } catch (error) {
            changeLoading(false);
            console.log(error)

            switch (error.code) {
                case 'auth/weak-password':
                    setError(true)
                    changeMessageError('La contraseña debe de ser al menos de 6 caracteres')
                    break;
                case 'auth/email-already-exists':
                    setError(true)
                    changeMessageError('El email ingresado ya esta en uso')
                    break;
                case 'auth/invalid-email':
                    setError(true)
                    changeMessageError('El email ingreado no es valido')
                    break;
                case 'auth/email-already-in-use':
                    setError(true)
                    changeMessageError('El email ingreado ya está en uso')
                    break;
                default:
                    setError(true)
                    changeMessageError('Hubo un error al intentar crear la cuenta')
                    break;
            }
        } 
    }

    const handleLoginWithGoogleClick = async () => {

        await auth.signInWithPopup(google);
        history.push('/')
    }

    return (
        <ContainerSignUp>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Icon/>
                    <Title>Crea tu cuenta</Title>
                    {
                        error ? <MessageError message={messageError}/> : null
                    }
                    <Input type='text' 
                            placeholder='Nombre' 
                            autocomplete='off'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            
                    />
                    <Input type='email' 
                            placeholder='Correo'
                            autocomplete='off'
                            name='email'
                            value={email}
                            onChange={handleChange}
                    />
                    <Input type='password' 
                            placeholder='Contraseña' 
                            autocomplete='off'
                            name='password'
                            value={password}
                            onChange={handleChange}
                    />
                    <Input type='password' 
                            placeholder='Repetir contraseña' 
                            autocomplete='off'
                            name='password2'
                            value={password2}
                            onChange={handleChange}
                    />
                    <h4>Fecha de nacimiento</h4>
                    <p>Esta información no será pública. Confirma tu propia edad, incluso si esta cuenta es para una empresa, una mascota u otra cosa.</p>
                    <Input type='date'
                            name='date'
                            
                            value={date}
                            onChange={handleChange}
                    />
                    {
                        loading ? <ButtonSignUp><Spinner/></ButtonSignUp> : <ButtonSignUp>Registrar cuenta</ButtonSignUp>
                    }
                    
                    
                </form>

                <DFlex>
                    <Line/>
                    <p>O</p>
                    <Line/>
                </DFlex>
                <ButtonLoginGoogleAndFacebook onClick={handleLoginWithGoogleClick}><IconGoogle className='fab fa-google'></IconGoogle>Créate una cuenta con Google</ButtonLoginGoogleAndFacebook>
                
                <Login to={'/login'}>Iniciar sesión</Login>
            </Container>
        </ContainerSignUp>
    )
}

const ButtonSignUp = styled.button`
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
const Login = styled(Link)`
    color: var(--primary);
    text-decoration:none;
    margin:0 auto;
    font-size:17px;
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
const ContainerSignUp = styled.div`

    @media(min-width:768px){
        width:500px;
        margin:0 auto;
    }
    
`;