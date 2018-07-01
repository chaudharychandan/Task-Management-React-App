import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

import { Home, Boards, Lists } from '../../scenes';
import Header from '../Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: red[400],
      main: red[600],
      dark: red[900],
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path='/boards' component={Boards} exact />
          <Route path='/boards/:id/lists' component={Lists} />
          <Redirect from="/" to="/" />
        </Switch>
      </MuiThemeProvider>
    );
  }
};

export default App;
