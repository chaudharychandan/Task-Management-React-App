import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { Typography, IconButton, Divider } from 'material-ui';
import { Delete as DeleteIcon } from 'material-ui-icons';
import CardAdd from './components/CardAdd';
import CardComponent from './components/Card';
import { connect } from 'react-redux';

import { addCard, removeCard } from '../../../../actions';

class ListComponent extends Component {
  onDeleteCard = (id, index) => {
    const listId = this.props.list.id;
    this.props.removeCard({
      listId,
      id,
      index
    });
  }

  renderCards = () => {
    const { cardsById, list: { cards } } = this.props;

    return cards.map((id, index) => {
      return (
        <CardComponent card={cardsById[id]} onDeleteCard={() => this.onDeleteCard(id, index)} key={id} />
      );
    });
  };

  onCreate = (card) => {
    const { list: { id } } = this.props;
    this.props.addCard({ card, listId: id });
  }

  render() {
    const { list } = this.props;

    return (
      <Card>
        <CardContent>
          <Typography variant="subheading">{list.name}</Typography>
          <List>
            {this.renderCards()}
          </List>
          <CardAdd onCreate={this.onCreate} />
        </CardContent>
      </Card>
    );
  }
};

const mapStateToProps = ({ lists, cards }, ownProps) => {
  const { list: { id } } = ownProps;
  const list = lists.byId[id];
  return {
    list,
    cardsById: cards.byId
  };
};

export default connect(mapStateToProps, { addCard, removeCard })(ListComponent);
