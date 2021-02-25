import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, RouteComponentProps } from '@reach/router'
import Login from './pages/login/Login'

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent

ReactDOM.render(
    <Router>
      <App path='/'>
        <RouterPage pageComponent={<Login/>} path='/' />
      </App>
    </Router>,
  document.getElementById('root')
);