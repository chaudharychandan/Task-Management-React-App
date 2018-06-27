import React, { Component } from 'react';
import { TextField, Button, IconButton } from '@material-ui/core';
import { Close as CloseIcon, AddCircle as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

class ListCreate extends Component {
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

  onClose = (event) => {
    this.setState({name : ''});
  }

  renderActions = () => {
    const { name } = this.state;
    const { classes } = this.props;
    if(name) {
      return (
        <div className={classes.actions}>
          <Button variant="raised" color="secondary" size="small" type="submit" className={classes.button}>
            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            Add
          </Button>
          <IconButton onClick={this.onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    }
  }

  render() {
    const { name } = this.state;
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit} className={classes.newListForm}>
        <TextField
          label="List"
          value={name}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
        />
        {this.renderActions()}
      </form>
    );
  }
}

const styles = theme => ({
  newListForm: {
    width: '100%',
    height: '100%'
  },
  textField: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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

export default withStyles(styles)(ListCreate);
