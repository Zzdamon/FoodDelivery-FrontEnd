import React from 'react';
import Layout from '../components/Layout/Layout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class MyAccount extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user:props.user,
            orderCount:0
        }
    }

     componentDidMount(){
       let order= JSON.parse(localStorage.getItem("game-start-orders"));
       if(order&&order[this.state.user.data.email]){
            console.log(order[this.state.user.data.email])
           this.setState({orderCount:order[this.state.user.data.email].length})
       }
    
     }

render(){
    return(
            <Layout>
               
                {this.state.user.data?
                     <div className="container-fluid container-min-max-width
                     d-flex flex-column justify-content-center ">
                <h3 className="w-100 m-2">Account Data</h3>
                         <div className="row">
                    <div className="col-sm-12 col-md-5 m-2">
                        <img src={this.state.user.data.photoURL} alt=""/>
                    </div>

                    <div className="col-sm-12 col-md-6 m-2">
                        <h5>Name: {this.state.user.data.displayName}</h5>
                        <h5>Email: {this.state.user.data.email}</h5>
                        <h5>Last signed in: {
                         this.state.user.data.lastLoginAt 
                         ?(new Date(parseInt(this.state.user.data.lastLoginAt))).toDateString()
                        :new String("Just now!")}</h5>
                        
                    </div>
                    </div>
                        <h3 className="m-2">Activity</h3>
                        {this.state.orderCount>0
                        ? <Link to="/orders">
                            <h5 className="mx-2">Orders: {this.state.orderCount}</h5>
                        </Link> 
                        :<h5 className="mx-2">Nothing to show!</h5>

                        }

                </div>
                : this.props.history.push("/login")
                }
            </Layout>
        
    );
}
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps)(MyAccount);