import React, { Component } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { IconButton, Divider } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

class CardComponent extends Component {
  render() {
    const { card, onDeleteCard } = this.props;
    const { classes } = this.props;
    return (
      <div>
        <ListItem>
          <ListItemText primary={card.name}/>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={onDeleteCard}>
                <CloseIcon className={classes.hoverColor}/>
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

const styles = theme => {
  return ({
    hoverColor: {
      '&:hover': {
        color: blue[500]
      }
    }
  });
};

export default withStyles(styles)(CardComponent);
