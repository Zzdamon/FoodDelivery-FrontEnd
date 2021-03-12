import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
// ... 

export class MapContainer extends React.Component {}
 
export default GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer)

