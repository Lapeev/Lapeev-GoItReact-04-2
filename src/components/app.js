import React, { Component } from 'react';
import style from './mainApp.module.css';
import Controls from '../pages/controls/controls';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className={style.reader}>
        <Controls />
      </div>
    );
  }
}
