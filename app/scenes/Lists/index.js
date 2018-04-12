import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { addList } from '../../actions';

import ListCreate from './components/ListCreate';
import ListComponent from './components/List';

class Lists extends Component {
  onCreate = (list) => {
    const { match : { params : { id } }  } = this.props;
    this.props.addList({ boardId: id, list });
  }

  renderLists = () => {
    const { listIds, allLists } = this.props;
    return listIds.map((id) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <ListComponent list={allLists[id]} />
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
    padding: '25px 10%'
  }
});

const mapStateToProps = ({ boards, lists }, ownProps) => {
  const { match : { params : { id } }  } = ownProps;
  return {
    listIds: boards.byId[id].lists,
    allLists: lists.byId
  };
};

export default compose(withStyles(styles), connect(mapStateToProps, { addList }))(Lists);
