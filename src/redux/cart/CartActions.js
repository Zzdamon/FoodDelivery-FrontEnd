import * as CartConstants from './CartConstants'

export function addToCart(payload) {
    return {
        type: CartConstants.add,
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