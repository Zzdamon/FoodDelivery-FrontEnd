import * as FavConstants from './FavConstants'

let initialFav=JSON.parse(localStorage.getItem("game-start-fav"));
initialFav? initialFav=initialFav.products
: initialFav=[];


const initialState = {
    products: initialFav
}


export function favouritesReducer(state = initialState, action) {
    switch (action.type) {
        case FavConstants.add:           
                let items = Object.assign({}, state, {
                    products:[...state.products, action.payload] 
                })
                localStorage.setItem("game-start-fav",JSON.stringify(items));
                 return items;   
            
        case FavConstants.rm:
            const filteredProducts = state.products.filter(product => {
                return product.id !== action.payload.id
            });
            localStorage.setItem("game-start-fav",JSON.stringify(filteredProducts));

            return Object.assign({}, state, {
                products: filteredProducts
            });
        default:
            return state;
    }
}

