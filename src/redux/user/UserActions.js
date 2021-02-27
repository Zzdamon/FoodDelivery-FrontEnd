import { signIn, signOut } from '../../apis/firebase/firebase';
import * as UserConstants from './UserConstants'

function startLoading() {
    return {
        type: UserConstants.startLoading
    }
}
function updateUserData(payload) {
    return {
        type: UserConstants.updateUserData,
        payload
    }
}
function updateUserError(payload) {
    return {
        type: UserConstants.updateUserError,
        payload
    }
}



export function loginUser(provider) { 
    return (dispatch) => {
        dispatch(startLoading());
        // if(provider==="google"){

            signIn(provider).then(userData => {
                dispatch(updateUserData(userData.user));
            }).catch(error => {
                dispatch(updateUserError(error));
            });
        }
}

export function logoutUser() {
    return dispatch => {
        dispatch(startLoading());

        signOut().then(() => {
            dispatch(updateUserData(null));
        }).catch((error) => {
            dispatch(updateUserError(error));
        });
    }
}