import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, IconButton, Toolbar, Typography } from 'material-ui';
import { Home as HomeIcon } from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Home" component={Link} to="/boards" className={classes.homeButton}>
              <HomeIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Trello
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = theme => {
  return ({
    homeButton: {
      marginRight: '24px'
    }
  });
};

export default withStyles(styles)(Header);
