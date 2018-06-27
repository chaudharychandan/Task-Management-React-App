import React, { Component } from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

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
            <Button type="submit" variant="raised" color="secondary">Add</Button>
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
  }
});

export default withStyles(styles)(BoardCreate);
