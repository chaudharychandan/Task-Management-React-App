import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Boards from '../../scenes/Boards';
import Lists from '../../scenes/Lists';
import Header from '../Header';

class App extends Component {
  render() {
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
};

export default App;
