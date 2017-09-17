import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MapContainer from './components/MapContainer.js';
import Houses from './components/Houses.js';
import InfoDialog from './components/infoDialog/InfoDialog.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      houses: [],
      showDialog: false
    };
    this.handleShowInfo = this.handleShowInfo.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillMount() {
    this.getHouses();
  }

  handleShowInfo(adId) {
    let houses = this.state.houses;
    let house;
    for (var i = 0; i < houses.length; i++) {
      if ((houses[i])["ad-external-id"] == adId)
        house = houses[i];
    }
    this.setState({
      showDialog: true,
      houseInfo: house
    });
  }

  closeDialog() {
    this.setState({
      showDialog: false,
      houseInfo: null
    });
  }

  getHouses() {
    $.ajax({
      url:'http://dbaapi.simonklit.com/search?q=lejlighed&at=4&ps=12&reg=10&pn=2&format=json',
      dbaapikey:'087157d7-84d5-4f2b-1d02-08d282f6c857',
      datatype: 'json',
      success: function(data) {
        console.log(data.ads);
        this.setState({houses: data.ads}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr);
        console.log(status);
        console.log(err);
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <MapContainer houses={this.state.houses} />
          <Houses houses={this.state.houses}  onShowInfo={this.handleShowInfo.bind(this)} />
          {this.state.showDialog ? <InfoDialog house={this.state.houseInfo} open={this.state.showDialog} onCloseDialog={this.closeDialog.bind(this)}/> : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
