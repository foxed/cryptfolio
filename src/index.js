import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SimplePieChart from './pie';
import ChartInput from './ChartInput'

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<SimplePieChart />, document.getElementById('root'));
ReactDOM.render(<ChartInput />, document.getElementById('chartinput'));
registerServiceWorker();
