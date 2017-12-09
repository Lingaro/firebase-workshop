import _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import DataGrid from './DataGrid';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  dataChange(row, column, event) {
    const data = _.merge({}, this.state.data, {
      [row]: {
        [column] : event.target.value
      }
    });
    this.setState({ data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Firebase</h1>
        </header>
        <DataGrid data={this.state.data} changeHandler={this.dataChange.bind(this)}/>
      </div>
    );
  }
}


export default App;
