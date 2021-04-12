import React, {useState} from 'react'
import {ButtonBack} from '../elements/ButtonBack';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useAuth} from '../context/AuthContext';
import {storage} from '../firebase/firebaseConfig';
import {SpinnerBlue} from '../components/SpinnerBlue';
import {ContainerDesktop} from '../elements/ContainerDesktop';

export const EditProfile = () => {

    const history = useHistory();
    const {user} = useAuth();

    const [name, changeName] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')

    const handleChange = e => {
        if(e.target.name === 'name'){
            changeName(e.target.value)
        }else if(e.target.name === 'file'){
            setImage(e.target.files[0]);
            
        }
    }
 
    const uploadImage = async () => {
        try {
            const newRef = storage.ref('fotos').child(image.name); // nombre del archiv
            await newRef.put(image);
            let urlImagen = await newRef.getDownloadURL();
 
            user.updateProfile({
                photoURL:urlImagen
            })
        } catch (error) {
            console.log(error);
        }
    };
    const uploadName = () => {
        user.updateProfile({
            displayName:name
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true);
        
        if(image){
            uploadImage().then(result => {setLoading(false)})
        }
        if(name){
            uploadName()
            setLoading(false);
        }
    }

    const handleClick = () => {
        history.push('/perfil')
    }

    const check = () => {
        if(password === '123456'){
            user.updateProfile({
                za:true
            }).then(result => {
                //history.push('/')
                console.log(user)
            })
        }
    }
    const handleCheckClick =  () => {
        check();  
    }

    return (
        <ContainerDesktop>
            <Header>
                <ButtonBack onClick={handleClick}><i className="fas fa-arrow-left"></i></ButtonBack>
                <H2>Editar perfil</H2>
            </Header>
           
            <Container>
                <form onSubmit={handleSubmit}>
                    <h4>Editar nombre</h4>
                    <InputText 
                        type="text"
                        name='name'
                        placeholder='Nuevo nombre'
                        value={name}
                        onChange={handleChange}
                    />

                    <h4>Editar foto de perfil</h4>
                    <input 
                        type="file"
                        name='file'
                        onChange={handleChange}
                    />
                    
                    {
                        loading
                            ? <EditButton><SpinnerBlue/></EditButton>
                            : <EditButton type='submit'>Editar</EditButton>
                    }
                    
                </form>
                <div>
                    <h4>¿Quieres verificar tu cuenta?</h4>
                    <InputText onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Codigo de verificación'/>
                    <CheckButton onClick={handleCheckClick}>Verificar</CheckButton>
                </div>
            </Container>

            
        </ContainerDesktop>
    )
}
const Header = styled.div`
    padding:12px 0 0 12px;
`;
const Container = styled.div`
    padding:12px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:70vh;
`;
const H2 = styled.h2`
    margin:1rem 0;

`;
const EditButton = styled.button`
    display:block;
    margin-top:20px;
    padding:10px 20px;
    border-radius:20px;
    border:solid 2px var(--primary);
    background:transparent;
    color:var(--primary);
    font-weight:bold;
    cursor:pointer;
    outline:none;
    width:170px;
`;
const InputText = styled.input`
    margin-bottom:10px;
    padding:5px 2px;
    border:solid 1px gray;
    outline:none;
    width:170px;
`;
const CheckButton = styled.button`
    margin-left:20px;
    padding:4px;
`;