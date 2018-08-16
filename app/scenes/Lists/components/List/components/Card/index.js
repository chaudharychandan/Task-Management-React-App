import React, { Component } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { IconButton, Divider } from '@material-ui/core';
import { Close as CloseIcon, Done as DoneIcon } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

class CardComponent extends Component {
  render() {
    const { card, onDeleteCard, onUpdateCard } = this.props;
    const { classes } = this.props;
  
    return (
      <div>
        <ListItem>
          <ListItemText primary={card.name}/>
            <ListItemSecondaryAction>
              { card.isComplete ?
                (
                  <IconButton aria-label="Delete" onClick={onDeleteCard}>
                    <CloseIcon className={classes.hoverColor}/>
                  </IconButton>
                ) :
                (
                  <IconButton aria-label="Complete" onClick={onUpdateCard}>
                    <DoneIcon className={classes.hoverColor}/>
                  </IconButton>
                )
              }
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
