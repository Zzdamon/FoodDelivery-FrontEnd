import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { emptyCart, removeFromCart } from '../../redux/cart/CartActions';
import { Link } from 'react-router-dom';
import './Cart.css';
import { ReactComponent as Close} from '../../assets/icons/close.svg';
import OrderForm from '../../components/OrderForm';

function Cart(props) {
    const totalSum = (products) => {
        return products.reduce((acc, product) => {
            return acc + product.quantity * product.price;
        }, 0)
    }

    return(
        <Layout>
            <div className="cart-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center">
                {
                    props.cart.products.length
                    ? <div className="w-100">
                        <div className="d-flex justify-content-between text-center h4 text-bold">
                            <p className="w-25">Produs</p>
                            <p className="w-25">Pret</p>
                            <p className="w-25">Cantitate</p>
                            <p className="w-25">Total</p>
                        </div>
                        {
                            props.cart.products.map(product => {
                                return <div className="d-flex justify-content-between align-items-center text-center" key={product.id}>
                                    <div className="w-25 d-flex flex-column justify-content-center align-items-center">
                                        <img src={product.image} alt="Produs"/>
                                        <p>{ product.name }</p>
                                    </div>
                                    <p className="w-25">{ product.price } { product.currency }</p>
                                    <p className="w-25">{ product.quantity }</p>
                                    <div className="w-25 d-flex justify-content-center">
                                        <p className="mr-2">{ product.price * product.quantity } { product.currency }</p>
                                        <div onClick={() => props.removeFromCart({itemId: product.itemId})}>
                                            <Close />
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        <div className="d-flex justify-content-end border-top">
                            <div className="w-25 d-flex align-items-center justify-content-center">
                                <p className="my-4 text-center font-weight-bold">Total de plată: </p>
                            </div>
                            <div className="w-25">
                                <p className="my-4 text-center">
                                    { totalSum(props.cart.products) } lei
                                    {/* { props.cart.products[0].currency } */}
                                </p>
                            </div>
                        </div>
                        <OrderForm {...props}/>
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
                    : <div className="d-flex w-25 flex-column align-items-center">
                        <p className="h3">Nu ai produse în coș!</p>
                        <Link to="/"><button className="btn btn-outline-dark">Inapoi la home</button></Link>
                    </div>
                }
            </div>
        </Layout>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);