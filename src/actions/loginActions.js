import {
  LOGIN,
  LOGOUT
} from './types';

import * as firebase from 'firebase';
import 'firebase/firestore';

export const login = user_login => dispatch => {
  firebase
  .auth()
  .signInWithEmailAndPassword(user_login.username, user_login.password)
  .then(data =>
    console.log('logged in'),
    dispatch({
    type: LOGIN,
    payload: "Logged In!"
  }))
  .catch(error =>
    console.log(error),
    dispatch({
        type: LOGIN,
        payload: "Problem logging in"
      }))
  }

export const logout = () => dispatch =>
  //fetch questions from server and set them to payload
  firebase.auth().signOut().then(function() {

    dispatch({
    type: LOGOUT,
    payload: "Logged Out!"
  })
}).catch(function(error) {
    dispatch({
        type: LOGOUT,
        payload: "Problem logging out"
      })
    }
  )
