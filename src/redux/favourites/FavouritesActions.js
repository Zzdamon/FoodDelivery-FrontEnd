import * as FavConstants from './FavConstants'

export function addToFavourites(payload) {
    return {
        type: FavConstants.add,
        payload
    }
}

export function removeFromFavourites(payload) {
    return {
        type: FavConstants.rm,
        payload
    }
}