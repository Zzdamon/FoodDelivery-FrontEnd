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
import { HubConnectionBuilder } from '@microsoft/signalr';



class OrderForm extends Component {
    constructor(props){
        super(props);
     
        this.state={
            waiting:false,
            userId: props.user.data.userId ,
            items:props.products,
            street:"",
            no:"",
            city:"",
            postalCode:"",
            connection: props.connection
        }
        
    }
 

    changeHandler(event) {
      this.setState({[event.target.name]: event.target.value});
    }
 render() {

    console.log(this.props)
    return (
      this.state.waiting?
      <div>
        <h2>Thank you for ordering! Your order will be taken by a courier soon!</h2>
      </div>
      :
      <form className="container-min-max-width d-flex flex-column m-2 w-25 "
      onSubmit={ async (event) => 
        {   event.preventDefault();

          //if not logged in, send to login page
           if(!this.props.user.data){
             this.props.history.push('/login')
           }
           //get the address from the form
            const address = this.state.street+" "+this.state.no+" "+this.state.city+" "+this.state.postalCode ;
            //build the order
            const order = {
              clientId: this.props.user.data.userId,
              deliveryAddress: address,
              restaurantId:this.props.cart.restaurant.id,
            }
            // stage:"waiting"
            
            //declare order items
          let orderItems=[];


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
                postOrder.restaurant= this.props.cart.restaurant;
                //send order to couriers
                this.state.connection.invoke("AddOrder", postOrder).catch(function (err) {
                  return console.error(err.toString());})

                console.log(postOrder)
               
                //initialize orderItems array that we want to post to db with itemId and orderId of the current order and items
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


            // let orderItem=orderItems[0]
            // console.log(orderItem)
            // console.log(orderItems)


                //POST ORDER ITEMS
               yeat.postOrderItems(orderItems)
               .then(items=>console.log(items))
              //END POST ORDER ITEMs

              //UPDATE WAITNG
              this.setState({waiting:true})
            
            
            
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