import React from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/CartActions';
import { Link } from 'react-router-dom';
import { addToFavourites, removeFromFavourites } from '../../redux/favourites/FavouritesActions';
import  { ReactComponent as Favourite} from '../../assets/icons/favourite.svg'
import  { ReactComponent as UnFavourite} from '../../assets/icons/favFill.svg'

function addItemToCart(props){
    
    console.log(props)
    // if(props.cart.restaurant.id==props.restaurant.id){
        props.addToCart({
            restaurant: props.restaurant,
            product: {
                itemId: props.itemId,
                name: props.name,
                price: props.price,
                description: props.description
                
            }
            })
    // }
}

function ProductItem(props){
        
        const {name, price, description, itemId} = props;
        console.log("product item call")
        

    return(
        <div className="product-item  d-flex mx-2 p-1 pb-4 mb-2 d-flex flex-column align-items-center border  rounded">
            <div className="d-flex flex-column align-items-center">
            
                <h5 className="my-2 text-center">{ name }</h5>
                <h6>{description}</h6>
                <h5 className="my-1 text-center">{ price + "RON" }</h5>
            </div>

            <div className=" mt-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() =>addItemToCart(props)}
                >
                Adaugă în coș
                </button>
            </div>
        </div>

            
    );    
    }


function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        addToFavourites: (product) => dispatch(addToFavourites(product)),
        removeFromFavourites: (product)=>dispatch(removeFromFavourites(product))

    };
}
function mapStateToProps(state) {
    return {
      cart:state.cart
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);