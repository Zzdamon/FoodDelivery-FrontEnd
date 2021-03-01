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



// async function updateServer(userData){
//     await fetch(`http://localhost:5000/api/Users/auth/${userData.email}/${userData.}`)
//     .then(data=>data.json())
//     .then(data=>{

//     })
// }

export function loginUser(provider) { 
    return (dispatch) => {
        dispatch(startLoading());
        // if(provider==="google"){

            signIn(provider).then(userData => {
                // updateServer();
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