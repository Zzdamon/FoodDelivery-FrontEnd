import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { emptyCart, removeFromCart, decreaseQuantity, increaseQuantity } from '../../redux/cart/CartActions';
import { Link } from 'react-router-dom';
import './Cart.css';
import { ReactComponent as Close} from '../../assets/icons/close.svg';
import { ReactComponent as Down} from '../../assets/icons/down.svg';
import { ReactComponent as Up} from '../../assets/icons/up.svg';
import OrderForm from '../../components/OrderForm';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import GoogleMap, { MapContainer } from '../../apis/google maps/maps';
import { HubConnectionBuilder } from '@microsoft/signalr';
// import { decreaseQuantity, increaseQuantity } from '../../redux/cart/CartActions';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cart: props.cart,
            order: null,
            user:props.user,
            courierLat:null,
            courierLng:null,
            connection:new HubConnectionBuilder()
            .withUrl('http://localhost:5000/hubs/OrdersHub')
            .withAutomaticReconnect()
            .build()
        }
    }

    

      start=async ()=> {
        try {
            await this.state.connection.start();
            this.state.connection.on("UpdatedOrder",(order) =>{ console.log(order); this.setState({order:order}) }) ;
            this.state.connection.on("FinishedTheOrder",(order) =>{ console.log("finished order"); this.setState({order:null}) }) ;
            this.state.connection.on("UpdatedLocation",(lat,lng) =>{ console.log(lat+" "+ lng); this.setState({courierLat:lat,
            courierLng:lng}) }) ;
            console.log("SignalR Connected.");
            
            this.state.connection.invoke("JoinRoom", "clients", this.state.user.data.clientId)
            .catch(function (err) {
              return console.error(err.toString());})
        } catch (err) {
            console.log(err);          
        }
    };
    
    componentDidMount(){
      this.start();
    
    }

    render(){
    const totalSum = (products) => {
        return products.reduce((acc, product) => {
            return acc + product.quantity * product.price;
        }, 0)
    }

    if(this.state.order){
        if(this.state.order.courierId){
            return(
                <GoogleMap order={this.state.order}
            courierLat={this.state.courierLat}
            courierLng={this.state.courierLng}
            />
            )
        } 

        return(
            <Layout >
                <div className="cart-container d-flex flex-column justify-content-center align-items-center">

                 <h2 className="text-center">Thank you for ordering! Your order will be taken by a courier soon!</h2>
                </div>
            </Layout>
        )
    }

    return(

        // this.state.order.courierId
        //     ?<GoogleMap order={this.state.order}
        //     courierLat={this.state.courierLat}
        //     courierLng={this.state.courierLng}
        //     />
        //     :
        

        <Layout>
            <div className="cart-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center">
                {

                    this.props.cart.products.length
                    ? <div className="w-100">
                        <div className="d-flex justify-content-between text-center h4 text-bold">
                            <p className="w-25">Product</p>
                            <p className="w-25">Price</p>
                            <p className="w-25">Quantity</p>
                            <p className="w-25">Total</p>
                        </div>
                        {
                            this.props.cart.products.map(product => {
                                return <div className="d-flex justify-content-between align-items-center text-center m-1" key={product.itemId}>
                                    <div className="w-25 d-flex flex-column justify-content-center align-items-center">
                                        <p>{ product.name }</p>
                                    </div>
                                    <p className="w-25">{ product.price } { product.currency } RON</p>
                                    <div className="w-25">    
                                        <Up onClick={ () => this.props.increaseQuantity({itemId: product.itemId}) } />
                                        <p className="m-0">{ product.quantity }</p>
                                        <Down  onClick={ () => this.props.decreaseQuantity({itemId: product.itemId}) }  />
                                    </div>
                                    <div className="w-25 d-flex justify-content-center">
                                        <p className="mr-2">{ product.price * product.quantity } { product.currency } RON</p>
                                        <div onClick={() => this.props.removeFromCart({itemId: product.itemId})}>
                                            <Close />
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        <div className="d-flex justify-content-end border-top">
                            <div className="w-25 d-flex align-items-center justify-content-center">
                                <p className="my-4 text-center font-weight-bold">Total to pay: </p>
                            </div>
                            <div className="w-25">
                                <p className="my-4 text-center">
                                    { totalSum(this.props.cart.products) } RON
                                    {/* { props.cart.products[0].currency } */}
                                </p>
                            </div>
                        </div>
                        <OrderForm {...this.props}
                        connection={this.state.connection}
                        updateState={(order)=>this.setState({order:order})}/>
                        
                        {/* <div className="container-min-max-width d-flex justify-content-end">
                                <button className="btn w-25 btn-success mw-6"
                                    onClick={()=>{
                                        if(!props.user.data){
                                            console.log("push login")
                                            props.history.push("/login")
                                            return;
                                        }
                                       
                                            let date=new Date();
                                           
                                        
                                            props.emptyCart();
                                    }}
                                >Order</button>
                        </div> */}
                    </div>
                    : <div className="cart-container container-min-max-width d-flex flex-column justify-content-center align-items-center">
                        <p className="h3 m-3 text-center">You don't have products in your cart!</p>
                        <Link to="/"><button className="btn btn-outline-dark">Back to home</button></Link>
                    </div>
                }
            </div>
        </Layout>
    );
}
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
        emptyCart: ()=>dispatch(emptyCart()),
        increaseQuantity: (payload) => dispatch(increaseQuantity(payload)),
        decreaseQuantity: (payload) => dispatch(decreaseQuantity(payload))
    
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);