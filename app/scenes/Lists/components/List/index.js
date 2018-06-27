import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { List } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import CardAdd from './components/CardAdd';
import CardComponent from './components/Card';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';

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
    const { list, classes } = this.props;
    const actionButton = (
      <Button className={classes.button} aria-label="Delete" color="secondary" variant="contained" size="small" onClick={() => this.onDeleteList(list)}>
        <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Delete
      </Button>
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

const styles = theme => {
  return ({
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
};

const mapStateToProps = ({ lists }, ownProps) => {
  const { list: { _id } } = ownProps;
  const list = lists.byId[_id];
  return {
    list
  };
};

export default compose(withStyles(styles), connect(mapStateToProps, { addCard, deleteCard, deleteList }))(ListComponent);
