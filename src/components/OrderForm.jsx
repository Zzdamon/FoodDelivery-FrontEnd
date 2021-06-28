import React, { Component } from 'react'
import { connect } from 'react-redux';
import { emptyCart, removeFromCart } from '../redux/cart/CartActions';
// import * as GooglePlaces from '../apis/google maps/places';
import scriptLoader,{isScriptLoadSucceed,isScriptLoaded} from 'react-async-script-loader'
import * as googleApi from '../configs/googleApi'
import * as validator from './validators/validators'

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
            user: props.user.data ,
            items:props.products,
            street:"",
            no:"",
            city:"",
            postalCode:"",
            connection: props.connection,
            error:null
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
      <form className="container-min-max-width d-flex flex-column m-2 w-45 "
      onSubmit={ async (event) => 
        {   event.preventDefault();

          //if not logged in, send to login page
           if(!this.props.user.data){
             this.props.history.push('/login')
             return;
           }
       
           //get the address from the form
            const address = this.state.street+" "+this.state.no+" "+this.state.city+" "+this.state.postalCode ;
            //build the order
            const order = {
              clientId: this.props.user.data.clientId,
              deliveryAddress: address,
              restaurantId:this.props.cart.restaurant.id,
            }
            // stage:"waiting"
            
            //declare order items
          let orderItems=[];

          //deliver coordinates
            let DeliveryLat;
            let DeliveryLng;

            try {
              //GEOCODING
          
            // const coordinates = await geocodeByAddress(address)

            //   DeliveryLat=coordinates[0].geometry.location.lat();
            //   DeliveryLng=coordinates[0].geometry.location.lng();
          
            //END OF GEOCODING

             //hard-coded coord
             DeliveryLat=44.151547427892936;
             DeliveryLng= 28.608205829468318;

            //POST ORDER
            order.DeliveryLat=DeliveryLat;
            order.DeliveryLng=DeliveryLng;
            order.stage= "Active";
            await yeat.postOrder(order)
              .then(postOrder=>{
                postOrder.restaurant= this.props.cart.restaurant;
              
           
              //add items to orderItems
              let orderItemsToSend=[];

              for (let item of this.props.cart.products){
                 console.log(item)
                 orderItemsToSend.push({
                    itemId: item.itemId,
                    orderId:postOrder.orderId,
                    item: item,
                    quantity: item.quantity
                   })
               }
              //add orderItems to the order
              postOrder.orderItems=orderItemsToSend;
              console.log("Post order: ")
              console.log(postOrder)
                 //send order to couriers
                 this.state.connection.invoke("AddOrder", postOrder).catch(function (err) {
                  return console.error(err.toString());})
               
                //initialize orderItems array that we want to post to db with itemId and orderId of the current order and items
                let Orderid= postOrder.orderId;
               for (let item of this.props.cart.products){
                 console.log(item)
                  orderItems.push({
                    itemId: item.itemId,
                    orderId:Orderid,
                    quantity: item.quantity
                   })
               }
                console.log(orderItems)
                console.log(postOrder)

              })
              .catch(
                error=>{
                  console.log(error);
                  this.setState({error:error});
                }
              );
              //END OF POST ORDER


            // let orderItem=orderItems[0]
            // console.log(orderItem)
            // console.log(orderItems)


                //POST ORDER ITEMS
               yeat.postOrderItems(orderItems)
               .then(items=>console.log(items))
              //END POST ORDER ITEMs



           

              //UPDATE WAITNG
              // this.setState({waiting:true})
              this.props.emptyCart();
              this.props.updateState(order)
            

            } catch (error) {
              this.setState({error:error});
            }
            
           
            
            
            //data validation 

            
        }}
      >
    <h3>Address Form</h3>
    <label htmlFor="street">Street name:</label>
    <input
        className="m-1"
        type="text"
        name="street"
        required="required"
        minLength="3"
        onChange={(event) => this.changeHandler(event)}
    />
    <label htmlFor="no">Street number:</label>
    <input
        className="m-1"
        type="number"
        name="no"
        required="required"
        onChange={(event) => this.changeHandler(event)}
    />
    
    <label htmlFor="city">City(Localitate):</label>
    <input
        className="m-1"
        type="text"
        name="city"
        required="required"
        minLength="3"
        onChange={(event) => this.changeHandler(event)}
    />

    <label htmlFor="postalCode">Postal Code:</label>
    <input
        className="m-1"
        type="number"
        name="postalCode"
        required="required"
        minLength="5"
        onChange={(event) => this.changeHandler(event)}
    />
    <input 
        className="btn btn-secondary m-1 mt-2"
        type="submit" value="Place Order"/>
{  this.state.error?
    <h5>An error has occured. Please try again!</h5>
    :null
  }
</form>
  
  
    );}
}

function mapStateToProps(state) {
  return {
      cart: state.cart,
      user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
      removeFromCart: (payload) => dispatch(removeFromCart(payload)),
      emptyCart: ()=>dispatch(emptyCart())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);// export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${googleApi.GOOGLE_API_KEY}&libraries=places`])(OrderForm)


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