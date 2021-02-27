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
        // const {name, price, currency, image, id} = this.state.item;
        const {name, price, currency, image, id} = props;
        let fav=false;
console.log("product item call")
    //   let favs= props.favourites;
        props.favourites.map((prod)=>{
            console.log(prod.id)
            console.log(id)

            if(prod.id===id){
                    fav=true;
            }
            return prod;
    })
        

    return(
        <div className="product-item d-flex mx-2 p-1 pb-4 mb-2 d-flex flex-column align-items-center border border-dark rounded">
            <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                <img src={image} alt="productPhoto" className="mb-2"/>
                <h6 className="my-2 text-center">{ name }</h6>
                <h5 className="my-1 text-center">{ price + currency }</h5>
            </Link>

            <div className=" mt-3">
            <button
                className="btn btn-outline-primary"
                onClick={() => props.addToCart({
                    product: {
                        id,
                        name,
                        price,
                        currency,
                        image
                    }
                })}
            >
                Adaugă în coș
            </button>

            {fav===true?            
            <div className="tp">
            <UnFavourite  className="favBtn m-1"
            onClick={
                ()=>props.removeFromFavourites(
                    {
                  
                        id,
                        name,
                        price,
                        currency,
                        image
                    
                }
                )
            }
            /> <span className="tptext">Remove from favourites</span></div>
            : <div className="tp"> 
            <Favourite className="favBtn m-1"
             onClick={
                // console.log("fav click")
                () => props.addToFavourites({
                  
                        id,
                        name,
                        price,
                        currency,
                        image
                    
                })}
             />
             <span className="tptext">Add to favourites</span>
            </div>
            }
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