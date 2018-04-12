import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import blue from 'material-ui/colors/blue';
import { IconButton, Divider } from 'material-ui';
import { Collapse } from 'material-ui/transitions';
import { ExpandMore, ExpandLess, ExposureZero as ZeroIcon, Delete as DeleteIcon } from 'material-ui-icons';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { deleteBoard } from '../../../../actions';

class Board extends Component {
  state = { open: false };

  renderLists = () => {
    const listIds = this.props.board.lists;
    const  { lists } = this.props;

    return listIds.map((id) => {
      const cardLength = lists[id].cards.length;
      return (
        <div key={id}>
          <ListItem>
            <ListItemText primary={lists[id].name} />
            {cardLength > 0 ? (cardLength === 1 ? `${cardLength} card` : `${cardLength} cards`) : `no cards`}
          </ListItem>
          <Divider />
        </div>
      );
    })
  }

  handleExpandClick = (event) => {
    event.stopPropagation();
    this.setState({open: !this.state.open});
  }

  renderExpandIcon = () => {
    if(this.props.board.lists.length>0) {
      return this.state.open  ? <ExpandLess /> : <ExpandMore />
    } else {
      return <ZeroIcon />
    }
  }

  onDeleteBoard = (board) => {
    this.props.deleteBoard(board);
  }

  render() {
    const { classes } = this.props;
    const { board } = this.props;
    const actionButton = (
      <IconButton aria-label="Delete" onClick={() => this.onDeleteBoard(board)}>
        <DeleteIcon className={classes.hoverColor} />
      </IconButton>
    );

    return (
      <Card className={classes.card}>
        <Link to={`boards/${board.id}/lists`} className={classes.link}>
          <CardHeader title={board.name} />
        </Link>
        <CardContent>
          <List>
            <ListItem button onClick={this.handleExpandClick}>
              <ListItemText primary="Lists" />
              {this.renderExpandIcon()}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {this.renderLists()}
              </List>
            </Collapse>
          </List>
        </CardContent>
        <CardActions>
          {actionButton}
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => {
  return ({
    card: {
      height: '100%',
      width: '100%',
      overflow: 'scroll'
    },
    link: {
      textDecoration: 'none'
    },
    hoverColor: {
      '&:hover': {
        color: blue[500]
      }
    }
  });
};

const mapStateToProps = ({ lists }) => {
  return {
    lists : lists.byId
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, { deleteBoard }))(Board);
