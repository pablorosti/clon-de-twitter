import React from 'react'
import styled from 'styled-components';
import {deleteTweet} from '../firebase/deleteTweet';
import {useAuth} from '../context/AuthContext';

export const ModalDelete = ({changeDeleteModal, id, idUnico, idDeleted}) => {

    const {user} = useAuth();
    console.log('id del usuario', user.uid)
    console.log(id)

    const handleDeleteClick = () => {
        deleteTweet(idDeleted);
        changeDeleteModal(false);
    }
    
    return (
        <Container>
            <ContainerButton>
                <DeleteButton onClick={handleDeleteClick}><i className="far fa-trash-alt"></i>eliminar</DeleteButton>
                <Button><i className="fas fa-thumbtack"></i>Fijar en tu perfil</Button>
                <Button><i className="fab fa-gitter"></i>Ver actividad del tweet</Button>
                <CancelButton onClick={() => changeDeleteModal(false)}>Cancelar</CancelButton>         
            </ContainerButton>
        </Container> 
    )
}
const Container = styled.div`
    position:fixed;
    bottom:0;
    height:200px;
    background:rgb(126, 126, 126);
    width:100%;
    border-radius:20px 20px 0 0;
`;
const ContainerButton = styled.div`
    margin:20px 15px 0 15px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    
`;
const DeleteButton = styled.button`
    display:block;
    background:transparent;
    border:none;
    outline:none;
    color:rgb(255, 146, 146);
    font-weight:bold;
    font-size:1.05rem;
    text-transform:capitalize;
    margin-bottom:5px;
    &>i{
        margin-right:10px;
    }
`;
const Button = styled.button`
    display:block;
    background:transparent;
    border:none;
    margin:5px 0;
    outline:none;
    font-size:1.05rem;
    font-weight:bold;
    color:white;
    &>i{
        margin-right:10px;
    }
`;
const CancelButton = styled.button`
    display:block;
    width:100%;
    margin:5px 0 20px 0;
    background:white;
    border:none;
    border-radius:20px;
    padding:10px;
    font-weight:bold;
    font-size:13px;
`;