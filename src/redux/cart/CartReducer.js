import * as CartConstants from './CartConstants'

let initialCart=JSON.parse(localStorage.getItem("game-start-cart"));
initialCart? initialCart=initialCart.products
: initialCart=[];

const initialState = {
    products: initialCart
}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CartConstants.add:
            let productInCart = false;
            const updatedProducts = state.products.map(product => {
                if (product.id === action.payload.product.id) {
                    productInCart = true;
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                } else {
                    return product;
                }
            })

            if (!productInCart) {

                let items= Object.assign({}, state, {
                    products: [
                        ...state.products,
                        {
                            ...action.payload.product,
                            quantity: 1
                        }
                    ]
                })
                localStorage.setItem("game-start-cart",JSON.stringify(items));
                return items;

            } else {
                let items= Object.assign({}, state, {
                    products: updatedProducts
                });
                localStorage.setItem("game-start-cart",JSON.stringify(items))
                return items;

            }
        case CartConstants.rm:
            const filteredProducts = state.products.filter(product => {
                return product.id !== action.payload.id
            });
            let items= Object.assign({}, state, {
                products: filteredProducts
            });
            localStorage.setItem("game-start-cart",JSON.stringify(items))
            return items;
        
        case CartConstants.empty:
            localStorage.setItem("game-start-cart",null)
            return Object.assign({}, state, {
                products: []
            });
        default:
            return state;
    }
}

