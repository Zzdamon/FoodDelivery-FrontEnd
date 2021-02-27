import React from 'react'
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';


function Favourites(props) {
        
    return (

        <Layout>
            <div className="fav-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center">
            
            {props.favourites.length>0
            ?<div className="container-fluid container-min-max-width">
                <h3>Produsele tale favorite:</h3>
                    <ProductList products={props.favourites}></ProductList>
            
                
            </div>
            :<div className="d-flex flex-column align-items-center">
                        <p className="h3">Nu ai produse favorite!</p>
                        <Link to="/"><button className="btn btn-outline-dark">Inapoi la home</button></Link>
            </div>
}
</div>
</Layout>

    )
}


// function mapDispatchToProps(dispatch) {
//     return {
//         addToCart: (product) => dispatch(addToCart(product)),
//         addToFavourites: (product) => dispatch(addToFavourites(product)),
//         removeFromFavourites: (product)=>dispatch(removeFromFavourites(product))

//     };
// }
function mapStateToProps(state) {
    return {
      favourites:state.favourites.products
    }
}

export default connect(mapStateToProps)(Favourites);