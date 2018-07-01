import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, AppBar, IconButton, Toolbar, Typography, Avatar, Menu, MenuItem } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { DOMAIN } from '../../config';
import { fetchProfile } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderUserStatus = () => {
    const { anchorEl } = this.state;
    const { user, classes } = this.props;
    const open = Boolean(anchorEl)
    if (user) {
      const { name, photos } = user;
      const [ { value } = photo ] = photos;
      return (
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Avatar alt={name} src={value} className={classes.avatar} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <Button size="small" href={`${DOMAIN}/auth/google/logout`}>Logout</Button>
            </MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <Button color="secondary" variant="contained" href={`${DOMAIN}/auth/google`}>Login</Button>
      );
    }
  }

  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="Home" component={Link} to="/" className={classes.homeButton} color="secondary">
              <HomeIcon />
            </IconButton>
            <Typography variant="title" className={classes.flex}>
              { user && <NavLink to="/boards">Boards</NavLink> }
            </Typography>
            {this.renderUserStatus()}
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
    avatar: {
      margin: 10,
    },
  });
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.profile
  };
};

export default compose(withStyles(styles), connect(mapStateToProps, { fetchProfile }))(Header);
