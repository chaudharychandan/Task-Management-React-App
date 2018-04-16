import React, { Component } from 'react';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { IconButton, Divider } from 'material-ui';
import { Delete as DeleteIcon } from '@material-ui/icons';
import CardAdd from './components/CardAdd';
import CardComponent from './components/Card';
import { connect } from 'react-redux';

import { addCard, deleteCard, deleteList } from '../../../../actions';

class ListComponent extends Component {
  onDeleteCard = (_id) => {
    const listId = this.props.list._id;
    this.props.deleteCard({ listId, _id });
  }

  renderCards = () => {
    const { list: { cards } } = this.props;

    return cards.map((card) => {
      const { _id } = card;
      return (
        <CardComponent card={card} onDeleteCard={() => this.onDeleteCard(_id)} key={_id} />
      );
    });
  };

  onCreate = (card) => {
    const { list: { _id } } = this.props;
    this.props.addCard({ card, listId: _id });
  }

  onDeleteList = (list) => {
    this.props.deleteList(list);
  }

  render() {
    const { list } = this.props;
    const actionButton = (
      <IconButton aria-label="Delete" onClick={() => this.onDeleteList(list)}>
        <DeleteIcon />
      </IconButton>
    );

    return (
      <Card>
        <CardHeader title={list.name} action={actionButton}/>
        <CardContent>
          <List>
            {this.renderCards()}
          </List>
          <CardAdd onCreate={this.onCreate} />
        </CardContent>
      </Card>
    );
  }
};

const mapStateToProps = ({ lists }, ownProps) => {
  const { list: { _id } } = ownProps;
  const list = lists.byId[_id];
  return {
    list
  };
};

export default connect(mapStateToProps, { addCard, deleteCard, deleteList })(ListComponent);
