import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/gamestart1.png';
// import { ReactComponent as Google } from '../../assets/icons/google.svg';
// import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import './Login.css'
import LoginForm from '../../components/LoginForm'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            register: false
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.user !== prevProps.user) {
    //         this.props.history.push('/');
    //     }
    // }

    render() {
        return(
            <div className="login-page">
                <Link to='/'>
                    <img src={Logo} alt="logo" className="mb-5"/>
                </Link>
                {!this.state.register
                ? 
                <div>
                    <LoginForm {...this.props} />
                    <div className="container-fluid d-flex align-items-center">
                    <h1 className="h5">or register right now!</h1>
                    <button className="btn btn-secondary m-1 mt-2"
                    onClick={()=>this.setState({register:true})}>Sign Up</button>
                    </div>
                </div>
                :null
                }
                
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user.data
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         signInWithGoogle: () => dispatch(loginUser("google")),
//         signInWithFacebook: () => dispatch(loginUser("facebook"))
//     }
// }

export default Login;