import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
// ... 

 class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}
      initialCenter={{ lat: 47.444, lng: -122.176}}
      >
      </Map>
    );
  }
}

 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;
