import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, IconButton, Toolbar } from 'material-ui';
import { Home as HomeIcon } from '@material-ui/icons';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Home" component={Link} to="/boards">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
