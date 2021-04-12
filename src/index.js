import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Presentation} from './routes/Presentation'
import {Login} from './routes/Login';
import {SignUp} from './routes/SignUp';
import {Search} from './routes/Search';
import {Notification} from './routes/Notification';
import {Message} from './routes/Message';
import {Twetear} from './routes/Twetear'
import {Profile} from './routes/Profile';
import {EditProfile} from './routes/EditProfile';
import {Tweet} from './routes/Tweet'

import {AuthProvider} from './context/AuthContext';
import {PrivateRoute} from './components/PrivateRoute';

const Index = () => {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/presentacion' component={Presentation}/>
          <Route path='/login' component={Login}/>
          <Route path='/registro-usuario' component={SignUp}/>

          <PrivateRoute path='/buscar'>
            <Search/>
          </PrivateRoute>
          <PrivateRoute path='/notificaciones'>
            <Notification/>
          </PrivateRoute>
          <PrivateRoute path='/mensajes'>
            <Message/>
          </PrivateRoute>
          <PrivateRoute path='/tweetear'>
            <Twetear/>
          </PrivateRoute>
          <PrivateRoute path='/perfil'>
            <Profile/>
          </PrivateRoute>
          <PrivateRoute path='/editar'>
            <EditProfile/>
          </PrivateRoute>
          <PrivateRoute path='/tweet/:id'>
            <Tweet/>
          </PrivateRoute>
          <PrivateRoute path='/'>
            <App/>
          </PrivateRoute>
          

        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);