import React, { Component } from 'react'
// import * as GooglePlaces from '../apis/google maps/places';
import scriptLoader,{isScriptLoadSucceed,isScriptLoaded} from 'react-async-script-loader'
import * as googleApi from '../configs/googleApi'
import {MapContainer} from '../apis/google maps/maps'
// import * as yeat from '../apis/yeat/yeat'
import PlacesAutocomplete , {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import * as yeat from '../apis/yEat/yeat';

class OrderForm extends Component {
    constructor(props){
        super(props);
        this.state={
            items:props.products,
            street:"",
            no:"",
            city:"",
            postalCode:""
        }
    }


  changeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

 render() {
    // if(isScriptLoaded&&isScriptLoadSucceed){

    console.log(this.props)
    return (
      <form className="container-min-max-width d-flex flex-column m-2 w-25 "
      onSubmit={ async (event) => 
        {   event.preventDefault();

           if(!this.props.user.data){
             this.props.history.push('/login')
           }
            const address = this.state.street+" "+this.state.no+" "+this.state.city+" "+this.state.postalCode ;
            const order = {
              userId: this.props.user.data.userId,
              address: address,
              restaurantId:this.props.cart.restaurant.id,
              stage:"waiting"
            }
          let orderItems=[];
          // console.log(order)

            //GEOCODING
            // geocodeByAddress(address)
            // .then(coordinates=>{
            //   // console.log(coordinates)
            //   // console.log(coordinates[0].geometry.location.lat())
            //   console.log(coordinates[0].geometry.location.toJSON())
            //   //{lat: , lng: }
            // })
            // .catch(error=>console.log(error));
            //END OF GEOCODING

            //POST ORDER
             await yeat.postOrder(order)
              .then(postOrder=>{
                console.log(postOrder)
               let Orderid= postOrder.orderId;
               for (let item of this.props.cart.products){
                 console.log(item)
                  orderItems.push({
                    itemId: item.itemId,
                    orderId:Orderid
                   })
               }
                       console.log(orderItems)

              })
              //END OF POST ORDER


                let orderItem=orderItems[0]
                console.log(orderItem)
                console.log(orderItems)


                //POST ORDER ITEMS
               yeat.postOrderItems(orderItems)
               .then(items=>console.log(items))
              //END POST ORDER ITEMs

            
            
            //aici creez un order daca adresa e valida,
            //afisez harta cu pin points pe adresa pers si a restaurantului
            //afisez statutul orderului
            
            //trimit si coordonatele in pachet? sau salvez in bd 
            //folosesc form sau autocomplete?
            //problema cu incarcarea async a api-ului gugal
            //data validation 

            
        }}
      >
    <h2>Address:</h2>
    <label htmlFor="street">Street name:</label>
    <input
        className="m-1"
        type="text"
        name="street"
        onChange={(event) => this.changeHandler(event)}
    />
    <label htmlFor="no">Street number:</label>
    <input
        className="m-1"
        type="number"
        name="no"
        onChange={(event) => this.changeHandler(event)}
    />
    
    <label htmlFor="city">City(Localitate):</label>
    <input
        className="m-1"
        type="text"
        name="city"
        onChange={(event) => this.changeHandler(event)}
    />

    <label htmlFor="postalCode">Postal Code:</label>
    <input
        className="m-1"
        type="text"
        name="postalCode"
        onChange={(event) => this.changeHandler(event)}
    />
    <input 
        className="btn btn-secondary m-1 mt-2"
        type="submit" value="Save"/>

</form>
  
    );}
}
export default OrderForm
// export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${googleApi.GOOGLE_API_KEY}&libraries=places`])(OrderForm)


  //  handleChange = address => {
  //      console.log(this.state.address)
  //   this.setState({ address });
  // };
 
  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };


      // <PlacesAutocomplete
      //   value={this.state.address}
      //   onChange={this.handleChange}
      //   onSelect={this.handleSelect}
      // >
      //   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      //     <div>
      //       <input
      //         {...getInputProps({
      //           placeholder: 'Enter Address ...',
      //           className: 'location-search-input',
      //         })}
      //       />
      //       <div className="autocomplete-dropdown-container">
      //         {loading && <div>Loading...</div>}
      //         {suggestions.map(suggestion => {
      //           const className = suggestion.active
      //             ? 'suggestion-item--active'
      //             : 'suggestion-item';
      //           // inline style for demonstration purpose
      //           const style = suggestion.active
      //             ? { backgroundColor: '#fafafa', cursor: 'pointer' }
      //             : { backgroundColor: '#ffffff', cursor: 'pointer' };
      //           return (
      //             <div
      //               {...getSuggestionItemProps(suggestion, {
      //                 className,
      //                 style,
      //               })}
      //             >
      //               <span>{suggestion.description}</span>
      //             </div>
      //           );
      //         })}
      //       </div>
      //     </div>
      //   )}
      // </PlacesAutocomplete>