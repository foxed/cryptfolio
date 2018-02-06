import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SimplePieChart from './pie';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<SimplePieChart />, document.getElementById('root'));
registerServiceWorker();
