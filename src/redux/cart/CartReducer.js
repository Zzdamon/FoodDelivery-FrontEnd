import * as CartConstants from './CartConstants'

let initialState = {
    products: [],
    restaurant: null
}

let initialCart=JSON.parse(localStorage.getItem("yeat-cart"));

if(initialCart){
    initialState.products=initialCart.products;
    initialState.restaurant=initialCart.restaurant;

}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CartConstants.add:
            let productInCart = false;
            
            const updatedProducts = state.products.map(product => {
                if (product.itemId === action.payload.product.itemId) {
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
                let items={};
                if(action.payload.restaurant===state.restaurant){

                    items= Object.assign({}, state, {
                        products: [
                            ...state.products,
                            {
                                ...action.payload.product,
                                quantity: 1
                            }
                        ],
                    })
                }
                    else{
                        items={
                            products: [ {
                                ...action.payload.product,
                                quantity: 1
                            }],
                            restaurant: action.payload.restaurant
                        }
                    }
                localStorage.setItem("yeat-cart",JSON.stringify(items));
                return items;

            } else {
                let items= Object.assign({}, state, {
                    products: updatedProducts,
                   
                });
                localStorage.setItem("yeat-cart",JSON.stringify(items))
                return items;

            }
        case CartConstants.rm:
            const filteredProducts = state.products.filter(product => {
                return product.itemId !== action.payload.itemId
            });
            let items= Object.assign({}, state, {
                products: filteredProducts
            });
            localStorage.setItem("yeat-cart",JSON.stringify(items))
            return items;
        
        case CartConstants.increaseQuantity:
            // let item=state.products.find(item=>item.itemId===action.payload.itemId);
            const increaseQuantityListOfProducts=state.products.map(product => {
                if(product.itemId===action.payload.itemId){
                    // if(product.quantity<15)
                    product.quantity+=1;
                }
                return product;
            })
            return Object.assign( {}, state, {
                products: increaseQuantityListOfProducts
            })
            
            case CartConstants.decreaseQuantity:
                // let item=state.products.find(item=>item.itemId===action.payload.itemId);
                const decreaseQuantityListOfProducts = state.products.map(product => {
                    if(product.itemId === action.payload.itemId){
                        if(product.quantity > 1){
                        product.quantity -= 1;
                        }
                    }
                    return product;
                })
                return Object.assign( {}, state, {
                    products: decreaseQuantityListOfProducts
                })

        case CartConstants.empty:
            localStorage.setItem("yeat-cart",null)
            return Object.assign({}, state, {
                products: []
            });
        default:
            return state;
    }
}

