import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { addList, fetchBoard, fetchLists } from '../../actions';

import ListCreate from './components/ListCreate';
import ListComponent from './components/List';

class Lists extends Component {
  onCreate = (list) => {
    const { boardId } = this.props;
    this.props.addList({ boardId, ...list });
  }

  renderLists = () => {
    const { listsById, board, boardId } = this.props;
    let listIds, allIds;
    if (board) {
      listIds = board.lists;
      const allIds = Object.keys(listsById);
      if (listIds.length > 0 && allIds.length === 0) {
        this.props.fetchLists(boardId);
        return;
      }
    } else {
      this.props.fetchBoard(boardId);
      return;
    }

    return listIds.map((id) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <ListComponent list={listsById[id]} />
        </Grid>
      );
    });
  }

  renderNewList = () => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ListCreate onCreate={this.onCreate}/>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.lists}>
        <Grid container spacing={16}>
          {this.renderLists()}
          {this.renderNewList()}
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  lists: {
    padding: '25px 5%'
  }
});

const mapStateToProps = ({ boards, lists }, ownProps) => {
  const { match : { params : { id } } } = ownProps;
  return {
    board: boards.byId[id],
    listsById: lists.byId,
    boardId: id
  };
};

export default compose(withStyles(styles), connect(mapStateToProps, { addList, fetchBoard, fetchLists }))(Lists);
