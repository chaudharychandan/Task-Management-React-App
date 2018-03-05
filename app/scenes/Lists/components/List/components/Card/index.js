import React, { Component } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { IconButton, Divider } from 'material-ui';
import { Delete as DeleteIcon } from 'material-ui-icons';

class CardComponent extends Component {
  render() {
    const { card, onDeleteCard } = this.props;
    return (
      <div>
        <ListItem>
          <ListItemText primary={card.name}/>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={onDeleteCard}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default CardComponent;
