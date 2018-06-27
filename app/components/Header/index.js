import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="Home" component={Link} to="/boards" className={classes.homeButton} color="secondary">
              <HomeIcon />
            </IconButton>
            <Typography variant="title" className={classes.flex}>
            </Typography>
            <Button color="secondary" variant="contained">Login</Button>
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
    },
    flex: {
      flex: 1,
    },
  });
};

export default withStyles(styles)(Header);
