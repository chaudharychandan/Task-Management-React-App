import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { connect } from 'react-redux';


import { Home, Boards, Lists } from '../../scenes';
import Header from '../Header';
import PrivateRoute from '../PrivateRoute';

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
    const { user } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute path='/boards' component={Boards} auth={user} exact />
          <PrivateRoute path='/boards/:id/lists' component={Lists}auth={user}  />
          <Redirect from="/" to="/" />
        </Switch>
      </MuiThemeProvider>
    );
  }
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.profile
  };
};

export default withRouter(connect(mapStateToProps)(App));
