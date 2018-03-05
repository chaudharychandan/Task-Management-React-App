import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { Divider } from 'material-ui';
import { Collapse } from 'material-ui/transitions';
import { ExpandMore, ExpandLess, ExposureZero as ZeroIcon }from 'material-ui-icons';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class Board extends Component {
  state = { open: false };

  renderLists = () =>{
    const listIds = this.props.board.lists;
    const  { lists } = this.props;

    return listIds.map((id) => {
      return (
        <div key={id}>
          <ListItem>
            <ListItemText primary={lists[id].name} />
            {`${lists[id].cards.length} cards`}
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

  render() {
    const { classes } = this.props;
    const { board } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <List>
            <ListItem>
              <Link to={`boards/${board.id}/lists`} className={classes.link}>
                <ListItemText primary={board.name}></ListItemText>
              </Link>
            </ListItem>
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
    }
  });
};

const mapStateToProps = ({ lists }) => {
  return {
    lists : lists.byId
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Board);
