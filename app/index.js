import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Boards from './scenes/Boards';
import Lists from './scenes/Lists';
import Header from './components/Header';

import './index.scss';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/boards' component={Boards} />
        <Route path='/boards/:id/lists' component={Lists} />
        <Redirect from="/" to="/boards" />
      </Switch>
    </div>
  );
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
