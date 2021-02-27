import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../configs/firebase';

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()


export const signOut = function() {
    return firebase.auth().signOut();
}

export const signIn = function(provider) {
    if(provider==="google")
        return firebase.auth().signInWithPopup(googleProvider);
    else if(provider==="facebook")
        return firebase.auth().signInWithPopup(facebookProvider);    
}

