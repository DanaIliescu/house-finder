import './HouseItem.css';

import {getPictureHref} from '../../helpers.js';

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

class HouseItem extends Component {
  constructor(props) {
      super(props);
  }

  showInfo(adId) {
    this.props.onShowInfo(adId);
  }

  render() {
    const style = {
      card: {
        height: '28vh',
        width: '15vw',
        padding: '10px'
      },
      text: {
        fontSize: '15px',
        display: 'block',
        padding: 0
      },
      img: {
        maxHeight: '17vh',
        maxWidth: '13vw'
      }
    }

    return (
      <Card className="card" style={style.card}>
        <CardMedia onClick={this.showInfo.bind(this, this.props.house["ad-external-id"])}>
          <img src={getPictureHref((this.props.house.pictures[3]).link[0])} alt="" style={style.img}/>
        </CardMedia>
        <CardTitle style={style.text} titleStyle={style.text} title={this.props.house.price + " dkk"} subtitle={this.props.house.matrixdata[3].value + " værelser"} />
      </Card>

    )
  }
}

export default HouseItem;
