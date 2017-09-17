import React, {Component} from 'react';
import uuid from 'uuid';

import HouseItem from './houseItem/HouseItem.js'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';


class Houses extends Component {
  showInfo(adId) {
    this.props.onShowInfo(adId)
  }

  render() {
    let houseItems;
    if (this.props.houses) {
      houseItems = this.props.houses.map(house => {
        let id = uuid.v4();
        return (
          <HouseItem onShowInfo={this.showInfo.bind(this)} key={id} house={house} />
        )
      })
    }

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '100vh',
        overflowY: 'scroll'
    }}

    return (
      <div style={styles.root}>
        {houseItems}
    </div>
    );
  }
}

export default Houses;
