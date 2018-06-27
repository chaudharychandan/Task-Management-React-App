import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Boards from '../../scenes/Boards';
import Lists from '../../scenes/Lists';
import Header from '../Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#62ebff',
      main: '#00b8d4',
      dark: '#0088a3',
      contrastText: '#000000',
    },
    secondary: {
      light: '#fd558f',
      main: '#c51162',
      dark: '#8e0038',
      contrastText: '#ffffff',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path='/boards' component={Boards} />
          <Route path='/boards/:id/lists' component={Lists} />
          <Redirect from="/" to="/boards" />
        </Switch>
      </MuiThemeProvider>
    );
  }
};

export default App;
