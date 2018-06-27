import React, { Component } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AddCircle as AddIcon } from '@material-ui/icons';

class BoardCreate extends Component {
  state = {
    name: ''
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.state.name) {
      return;
    } else {
      this.props.onCreate(this.state);
      this.setState({name : ''});
    }
  }

  render() {
    const { name } = this.state;
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit} className={classes.newBoardForm}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              label="Create new board"
              value={name}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
            >
            </TextField>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" className={classes.button} aria-label="Delete" color="secondary"  variant="raised" size="small">
              <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              Add
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

const styles = theme => ({
  newBoardForm: {
    height: '100%',
    width: '100%'
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textField: {
    width: '100%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

export default withStyles(styles)(BoardCreate);
