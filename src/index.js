import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyBNxF8g0ykANEF0MasEwObwN4tOi3ik0eE",
  authDomain: "fir-workshop-73452.firebaseapp.com",
  databaseURL: "https://fir-workshop-73452.firebaseio.com",
  projectId: "fir-workshop-73452",
  storageBucket: "fir-workshop-73452.appspot.com",
  messagingSenderId: "290640239875"
};
firebase.initializeApp(config);

ReactDOM.render(<App/>, document.getElementById('root'));
