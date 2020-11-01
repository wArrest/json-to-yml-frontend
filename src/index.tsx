import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
export interface Result{
  text?: string,
  message?: string
}
ReactDOM.render(<App/>, document.getElementById('root'));
