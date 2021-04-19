import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
// import moduleName from '../../assets/icons/home'
// ... 

 class MapContainer extends React.Component {

  render() {
    const style={  
      // width: '50%',
      // height: '50%',
      // display:"flexbox",
      // justifyContent:"center"
    }

    const containerStyle = {
      
      // display:"flexbox",
      // justifyContent:"center"
    }
    return (
      <Map google={this.props.google} zoom={14}
                initialCenter={{ lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
                style={style}
                containerStyle={containerStyle}
                >
        <Marker position={{  lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
        title="Home"
          // icon={{
          //   url: '../../assets/images/home.png'  ,
          //   anchor: new window.google.maps.Point(36,36),
          //   scaledSize: new window.google.maps.Size(64,64)
          // }}  
        />

<Marker position={{  lat: this.props.order.restaurant.restaurantLat, lng:  this.props.order.restaurant.restaurantLng }}
  />

<Marker position={{  lat: this.props.courierLat, lng:  this.props.courierLng }} //courier address
        />
      </Map>
    );
  }
}

 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;
