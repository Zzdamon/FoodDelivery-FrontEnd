import Layout from '../components/Layout/Layout';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Order from '../components/Order';

class Orders extends Component {

    constructor(props){
        super(props);
        this.state={
            user:props.user.data,
            orders:[]
        }
    }

    componentDidMount(){
        let orders=JSON.parse(localStorage.getItem("game-start-orders"));
        if(orders)
        {   let myOrders=orders[this.state.user.email];
            if(myOrders)
                this.setState({orders:myOrders})
        }
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid container-min-max-width
                     d-flex flex-column justify-content-center">


            {
            this.state.user
            ? this.state.orders.length>0?
            <div>
            <h3 className="m-3">My orders:</h3>
            {
                 this.state.orders.map(order=>
                   <Order order={order} /> )        
            }   
            </div>
            : <div className="d-flex  flex-column justify-content-center align-items-center">
            <p className="h3">You don't have any orders!</p>
            <Link to="/"><button className="btn btn-outline-dark">Inapoi la home</button></Link>
        </div>
            :  this.props.history.push("/login")
            }
                </div>
        </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps)(Orders);