import React, { Component } from 'react';
import { range, get } from "lodash";

const ARRAY_LENGTH = 10;
const ARRAY_HEIGHT = 30;

class DataGrid extends Component {

  render() {
    const { data, changeHandler } = this.props;

    return <div style={{ whiteSpace: 'nowrap' }}>{
      range(0, ARRAY_HEIGHT).map(y => [
        range(0, ARRAY_LENGTH).map(x =>
          <input key={x + '' + y} 
            type='text' 
            value={get(data, [x, y], '')} 
            onChange={changeHandler.bind(this, x, y)} />
        ),
        <br key={y} />
      ])
    }</div>;
  }
}


export default DataGrid;
