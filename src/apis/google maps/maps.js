import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
// import moduleName from '../../assets/icons/home'
// ... 

 class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}
                initialCenter={{ lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
      >
        <Marker position={{  lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
        title="Home"
          // icon={{
          //   url: '../../assets/images/home.png'  ,
          //   anchor: new window.google.maps.Point(36,36),
          //   scaledSize: new window.google.maps.Size(64,64)
          // }}  
        />

<Marker position={{  lat: this.props.cart.restaurant.restaurantLat, lng:  this.props.cart.restaurant.restaurantLng }}
  />

<Marker position={{  lat: 44.17033913544926, lng:  28.61045902108095 }} //courier address
        />
      </Map>
    );
  }
}

 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;
