import React from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/CartActions';
import { Link } from 'react-router-dom';
import { addToFavourites, removeFromFavourites } from '../../redux/favourites/FavouritesActions';
import  { ReactComponent as Favourite} from '../../assets/icons/favourite.svg'
import  { ReactComponent as UnFavourite} from '../../assets/icons/favFill.svg'

// class ProductItem extends React.Component {
//     // const {name, price, currency, image, id} = props;

//     constructor(props){
//         super(props);
//         this.state={
//             item:{...props},
//             favourites:[],
//             fav:false
//         }}

//     //     componentDidMount(){
//     //         this.state.favourites.map(prod=>{
//     //             if(prod.id===this.state.item.id){
//     //                     this.setState({
//     //                         fav:true
//     //                     })
//     //             }
//     //     })
//     // }

//     // componentDidUpdate(){
//     //     this.state.favourites.map(prod=>{
//     //         if(prod.id===this.state.item.id){
//     //                 this.setState({
//     //                     fav:true
//     //                 })
//     //         }
//     // })
//     // }


function ProductItem(props){
        
        const {name, price, description, itemId} = props;
        console.log("product item call")
        

    return(
        <div className="product-item d-flex mx-2 p-1 pb-4 mb-2 d-flex flex-column align-items-center border border-dark rounded">
            <div className="d-flex flex-column align-items-center">
            
                <h6 className="my-2 text-center">{ name }</h6>
                <h6>{description}</h6>
                <h5 className="my-1 text-center">{ price + "RON" }</h5>
            </div>

            <div className=" mt-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => props.addToCart({
                    product: {
                        itemId,
                        name,
                        price,
                        description
                        
                    }
                    })}
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
      favourites:state.favourites.products
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);