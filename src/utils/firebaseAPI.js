import * as firebase from 'firebase'
import Expo from 'expo'

export const createUser = (uid, key, value) => {
  firebase.database().ref().child('users').child(uid)
    .update({[key]:value})
}

export const updateUser = (uid, key, value) => {
  firebase.database().ref().child('users').child(uid)
    .update({[key]:value})
}

export const loginUser = (accessToken) => {
    const provider = firebase.auth.FacebookAuthProvider //declare fb provider
    const credential = provider.credential(accessToken) //generate fb credential

    return firebase.auth().signInWithCredential(credential) // signin to firebase using facebook credential
}

export const logoutUser = () => {
  return firebase.auth().signOut()
}