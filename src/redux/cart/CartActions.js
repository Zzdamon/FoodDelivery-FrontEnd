import * as CartConstants from './CartConstants'

export function addToCart(payload) {
    return {
        type: CartConstants.add,
        payload
    }
}

export function increaseQuantity(payload) {
    return {
        type: CartConstants.increaseQuantity,
        payload
    }
}

export function decreaseQuantity(payload) {
    return {
        type: CartConstants.decreaseQuantity,
        payload
    }
}


export function removeFromCart(payload) {
    return {
        type: CartConstants.rm,
        payload
    }
}

export function emptyCart() {
    return {
        type: CartConstants.empty
    }
}