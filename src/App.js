import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import DataGrid from './DataGrid';
import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  unsubscribe = () => { };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: null,
    }
  }

  dataChange(row, column, event) {
    const update = {};
    update[`${row}.${column}`] = event.target.value;
    this.doc.update(update);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.unsubscribe();
      if (user) {
        this.doc = firebase.firestore().collection(user.uid).doc('dataGrid');
        this.unsubscribe = this.doc.onSnapshot(snap => {
          if (!snap.exists) {
            this.doc.set({});
            return;
          }
          this.setState({ data: snap.data() })
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const loginButton = <button onClick={() => firebase.auth().signInWithPopup(provider)}>Login with Google</button>;
    const logoutButton = <button onClick={() => firebase.auth().signOut()}>Logout</button>;
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Firebase</h1>
        </header>
        {user ? <DataGrid data={this.state.data} changeHandler={this.dataChange.bind(this)} /> : loginButton}
        {user && logoutButton}
        {user && <a href={`https://us-central1-fir-workshop-73452.cloudfunctions.net/userData?id=${user.uid}`}>[xlsx]</a>}
      </div>
    );
  }
}

export default App;
