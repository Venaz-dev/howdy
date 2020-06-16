import firebase from 'firebase'

const config ={
    apiKey: "AIzaSyDZMNNy0ANqUEH1dvcPv45CT5Z_ByU3dE0",
    authDomain: "howdy-66dad.firebaseapp.com",
    databaseURL: "https://howdy-66dad.firebaseio.com"
}

firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()