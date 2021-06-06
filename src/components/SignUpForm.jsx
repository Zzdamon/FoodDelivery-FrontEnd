import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../redux/user/UserActions';
import {register} from '../apis/yEat/yeat'
import { registerUser } from '../redux/user/UserActions';


class SignUpForm extends Component {  

constructor(props){
    super(props);
    this.state={
        email:"",
        password:"",
        lastName:"",
        firstName:"",
        accountType:"client"
    }
}
// componentDidUpdate(prevProps) {
//     if (this.props.user !== prevProps.user) {
//         console.log(this.props.user)
//         this.props.history.push('/');
//     }
// }
changeHandler(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render(){
       
        return(
            <form className="container-min-max-width d-flex flex-column m-2 w-25 "
                
                onSubmit={(event) =>
                        {   event.preventDefault();
                           register(this.state.email,this.state.password,this.state.firstName,this.state.lastName )
                            .then(user=>{this.props.registerUser(user);
                                    this.props.history.push("/")
                            })
                            .catch(error=>console.log(error))
                          
                            
                         
                        }
                    }
            >
                <h2>Sign up</h2>
                <label htmlFor="email">Email:</label>
                <input
                    className="m-1"
                    type="text"
                    name="email"
                    onChange={(event) => this.changeHandler(event)}
                />
                  <label htmlFor="lastName">Last Name:</label>
                <input
                    className="m-1"
                    type="text"
                    name="lastName"
                    onChange={(event) => this.changeHandler(event)}
                />
                   <label htmlFor="firstName">First Name:</label>
                <input
                    className="m-1"
                    type="text"
                    name="firstName"
                    onChange={(event) => this.changeHandler(event)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    className="m-1"
                    type="password"
                    name="password"
                    onChange={(event) => this.changeHandler(event)}
                />
                
                <input 
                    className="btn btn-secondary m-1 mt-2"
                    type="submit" value="Save"/>

            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email,password) => dispatch(loginUser(email,password)),
        registerUser: (user)=> dispatch(registerUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);