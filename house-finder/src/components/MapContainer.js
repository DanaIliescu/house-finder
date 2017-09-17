import React, {Component} from 'react';
import uuid from 'uuid';

import GoogleApiComponent from '../google_config/GoogleApiComponent.js';
import Map from './Map.js';
import Marker from './Marker.js';
import InfoWindow from './InfoWindow.js';

export class Container extends Component {
  componentDidMount() {
    this.setState({
      houses: this.props.houses,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  setMarkers() {
    let houseItems;
    if (this.props.houses) {
      houseItems = this.props.houses.map(house => {
        let id = uuid.v4();
        let address = house["ad-address"];
        let pos = {
          lat: address.latitude,
          lng: address.longitude
        }

        let contentString = this.getInfo(house);

        return (
          <Marker
            key={id}
            name={address.street + ", " + address["zip-code"] + " " + address.city}
            onClick={this.onMarkerClick.bind(this)}
            position={pos}
           />
        )
      })
    }
    return houseItems;
  }

  getInfo(house) {
    let houseType = 2;
  }

  render(){
    const style = {
      display: 'inline',
      width: '50vw',
      height: '100vh'
    }

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return(
      <div style={style}>
        <Map
          onClick={this.onMapClick.bind(this)}
          google={this.props.google}>

          <Marker />

          {this.setMarkers()}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose.bind(this)}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
            </div>
          </InfoWindow>

        </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyALgO4vtxOoOk8-tCyoZrkE-IWEqW6wDPA'
})(Container)
