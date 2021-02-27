import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/gamestart1.png';
import { ReactComponent as ShoppingCart } from '../../assets/icons/shopping-cart.svg';
import './Header.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/user/UserActions';
import  { ReactComponent as Favourites} from '../../assets/icons/favFill.svg'

function Header(props) {
    return(
        <header className="border-bottom mb-3">
            <div className="container-fluid container-min-max-width d-flex justify-content-between align-items-center">
                <Link to="/" className="my-3">
                    <img src={Logo} alt="Game-Start" className="logo"/>
                </Link>
                <div>
                    { props.user
                        ?<Link to="/my-account">
                             <p>Hello, {props.user.displayName}!</p>
                        </Link>
                        : null
                    }
                    <div className="d-flex justify-content-end">
                        { props.user
                            ? <p className="logout h5" onClick={() => props.signOut()}>Logout</p>
                            : <Link to="/login" className="h5 mb-0">Login</Link>
                        }

                    <div className="d-flex align-items-center">
                            <Link to="/favourites" className="d-flex">
                                <Favourites className="ml-2"/>
                            </Link>
                            </div>

                        <div className="cartDiv d-flex align-items-center">
                            <Link to="/cart" className="cartLink d-flex">
                                <ShoppingCart className="cartIcon mx-2"/>
                                {
                                    props.numberOfProducts>0?
                                    <span className="cartProd ml-1 mb-0">{ props.numberOfProducts }</span>
                                   :null
                                }
                            </Link>

                    


                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function mapStateToProps(state) {
    return {
        numberOfProducts: state.cart.products.length,
        user: state.user.data
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);