import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Divider, Button } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess, ExposureZero as ZeroIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';

import { deleteBoard, fetchLists } from '../../../../actions';

class Board extends Component {
  state = { open: false };

  renderLists = () => {
    const { listsById, allIds } = this.props;
    const listIds = this.props.board.lists;
    if (allIds.length > 0) {
      return listIds.map((id) => {
        const cardLength = listsById[id].cards.length;
        return (
          <div key={id}>
            <ListItem>
              <ListItemText primary={listsById[id].name} />
              { cardLength > 0 ? (cardLength === 1 ? `${cardLength} card` : `${cardLength} cards`) : `no cards` }
            </ListItem>
            <Divider />
          </div>
        );
      });
    }
  }

  handleExpandClick = (event) => {
    event.stopPropagation();
    this.props.board.lists.length > 0 ? this.setState({open: !this.state.open}) : Function.prototype;
  }

  renderExpandIcon = (listLength) => {
    if(listLength > 0) {
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
    const listLength = board.lists.length;

    const actionButton = (
      <Button className={classes.button} aria-label="Delete" color="secondary" variant="contained" size="small" onClick={() => this.onDeleteBoard(board)}>
        <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Delete
      </Button>
    );

    return (
      <Card className={classes.card}>
        <Link to={`boards/${board._id}/lists`} className={classes.link}>
          <CardHeader title={board.name} classes={{ title: classes.linkHeader }}  />
        </Link>
        <CardContent>
          <List>
            <ListItem button onClick={this.handleExpandClick}>
              <ListItemText primary="Lists" />
              {listLength ? listLength : ''}  {this.renderExpandIcon(listLength)}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { this.state.open && this.renderLists() }
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
      textDecoration: 'none',
    },
    linkHeader: {
      '&:hover': {
        color: red[600]
      }
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
};

const mapStateToProps = ({ lists }) => {
  return {
    listsById: lists.byId,
    allIds: lists.allIds
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, { deleteBoard, fetchLists }))(Board);
