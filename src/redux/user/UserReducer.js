import * as UserConstants from './UserConstants'
let initialUser=JSON.parse(localStorage.getItem("game-start-user"));
const initialState = {
    data: initialUser,
    loading: false,
    error: null
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserConstants.startLoading:
            return Object.assign({}, state, {
                loading: true
            });
        case UserConstants.updateUserData:
            let user=action.payload;
            
                localStorage.setItem("game-start-user",JSON.stringify(user));
            
            return Object.assign({}, state, {
                data: user,
                loading: false,
                error: null
            });
        case UserConstants.updateUserError:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false
            })
        default:
            return state
    }
}