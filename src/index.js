import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Body from './pie';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Body/>, document.getElementById('simplepiechart'));
registerServiceWorker();
