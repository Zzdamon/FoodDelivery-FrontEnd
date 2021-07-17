import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../redux/user/UserActions';

class LoginForm extends Component {  

constructor(props){
    super(props);
    this.state={
        error:false,
        email:"",
        password:""
    }
}
componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
        console.log(this.props.user)
        this.props.history.push('/');
    }
}
changeHandler(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render(){
        return( 
        <div className="container-min-max-width d-flex flex-column align-items-center justify-content-center">
            <form className="container-min-max-width d-flex flex-column m-2 "
                
                onSubmit={(event) =>
                        {   event.preventDefault();
                            
                            try{

                                this.props.loginUser(this.state.email,this.state.password);
                                if(this.state.user.data===null){
                                this.setState({error:true})

                                }
                                this.setState({error:false})
                            }catch(error){
                                this.setState({error:true})
                            }
                           
                        }
                    }
            >
                <h2>Login:</h2>
                <label htmlFor="email">Email:</label>
                <input
                    className="m-1"
                    type="text"
                    name="email"
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
                    type="submit" value="Login"/>

            </form>
            {  this.state.error?
                <h5 className="text-danger">The email or password are not correct. Please try again!</h5>
                :null
              }</div>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);