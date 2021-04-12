import {useState} from 'react';
import {Header} from './components/Header';
import {NavigationBar} from './components/NavigationBar';
import {useGetTweets} from './hooks/useGetTweets';
import {CardTweet} from './components/CardTweet';
import {CircleAddTweet} from './components/CircleAddTweet';
import {SpinnerBlue} from './components/SpinnerBlue';
import styled from 'styled-components';
import {ModalDelete} from './components/ModalDelete';
import {BurguerMenu} from './components/BurguerMenu';
import {ContainerDesktop} from './elements/ContainerDesktop';

function App() {

  const [tweets] = useGetTweets();
  const [deleteModal, changeDeleteModal] = useState(false);
  const [menuBurguer, changeMenuBurguer] = useState(false);
  const [idDeleted, setIdDeleted] = useState('');

  return (
    <ContainerDesktop>
      <Header changeMenuBurguer={changeMenuBurguer}/>
      <br/>
      <br/>
      <br/>
      {
        tweets.length === 0 
          ? <Loading><SpinnerBlue/></Loading>
          :
            tweets.map((tweet) => {
            return <CardTweet 
                      key={tweet.idUnico}
                      tweet={tweet.tweet}
                      name={tweet.nombre}
                      id={tweet.idTweet}
                      //idUnico={tweet.idUnico}
                      changeDeleteModal={changeDeleteModal}
                      photo={tweet.avatar}
                      date={tweet.fecha}
                      image={tweet.urlImage}
                      likes={tweet.likes}
                      retweet={tweet.retweet}
                      verified={tweet.verificado}
                      setIdDeleted={setIdDeleted}

                    />
        })
        
      }
      {
        menuBurguer ? <BurguerMenu changeMenuBurguer={changeMenuBurguer}/> : null
      }
      <CircleAddTweet/>
      { deleteModal 
          ? 
            tweets.map((tweet, i)=>{
              return <ModalDelete 
                        key={i}
                        changeDeleteModal={changeDeleteModal}
                        id={tweet.id}
                        idUnico={tweet.idUnico} 
                        idDeleted={idDeleted}              
                      />
            })
          : null
      }
      <br/>
      <br/>
      <br/>
      <NavigationBar/>
    </ContainerDesktop>
  );
}

export default App;

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
