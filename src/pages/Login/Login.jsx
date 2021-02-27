import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/gamestart1.png';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';

import './Login.css'
import { connect } from 'react-redux';
import { loginUser } from '../../redux/user/UserActions';

class Login extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.props.history.push('/');
        }
    }

    render() {
        return(
            <div className="login-page">
                <Link to='/'>
                    <img src={Logo} alt="logo" className="mb-5"/>
                </Link>

                <h1 className="h2">Login</h1>
                <p>What do you want to login with?</p>

                <button
                    className="btn btn-outline-dark d-flex align-items-center"
                    onClick={() => this.props.signInWithGoogle()}
                >
                    <Google className="w-50 mr-3"/>
                    <span className="text-nowrap">Login with Google</span>
                </button>
                <button
                    className="btn btn-outline-dark d-flex align-items-center"
                    onClick={() => this.props.signInWithFacebook()}
                >
                    <Facebook className="w-50 mr-3"/>
                    <span className="text-nowrap">Login with Facebook</span>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signInWithGoogle: () => dispatch(loginUser("google")),
        signInWithFacebook: () => dispatch(loginUser("facebook"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);