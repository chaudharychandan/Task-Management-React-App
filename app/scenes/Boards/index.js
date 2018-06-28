import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Board from './components/Board';
import BoardCreate from './components/BoardCreate';

import { fetchBoards, addBoard, fetchLists } from '../../actions';

class Boards extends Component {
  componentWillMount() {
    this.props.fetchBoards();
    this.props.fetchLists();
  }

  renderBoards = () => {
    const { classes } = this.props;
    const { boardsById, boardIds } = this.props;

    return boardIds.map((id) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <Board board={boardsById[id]} />
        </Grid>
      );
    });
  }

  renderNewBoard = () => {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridTile}>
        <BoardCreate onCreate={this.onCreate} />
      </Grid>
    );
  }

  onCreate = (board) => {
    this.props.addBoard(board);
  }

  render() {
    const { classes, user } = this.props;

    return (
      <div className={classes.boards}>
        <Grid container className={classes.gridList} spacing={16}>
          {this.renderBoards()}
          {this.renderNewBoard()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ boards, user }) => {
  return {
    boardsById: boards.byId,
    boardIds: boards.allIds,
    user: user.profile
  };
};

const styles = theme => ({
  boards: {
    padding: '25px 5%'
  },
  gridList: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default compose(withStyles(styles), connect(mapStateToProps, { fetchBoards, addBoard, fetchLists }))(Boards);
