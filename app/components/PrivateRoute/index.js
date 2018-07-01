import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

const PrivateRoute = (props) => {
  const { component: Component, auth, classes, ...rest } = props;

  return (
    <Route
      {...rest}
      render={ props => {
          if (auth === false) {
            return ( <Redirect to={{ pathname: '/', state: { from: props.location }}} /> );
          } else if (auth instanceof Object) {
            return ( <Component {...props} /> );
          } else {
            return <CircularProgress className={classes.progress} size={50} color="secondary" />
          }
        }
      }
    />
  );
};

const styles = theme => ({
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
});

export default compose(withStyles(styles))(PrivateRoute);