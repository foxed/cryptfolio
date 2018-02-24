import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

//const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

class TestPie extends React.Component {	
	constructor(props) {
    super(props);
		this.state = {
			sectorAmt: []
		};

	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	  console.log('changed');
		this.setState({sectorAmt: [event.target.value]});
	}

	handleSubmit(event) {
		console.log('submitted');
    event.preventDefault();
		console.log(this.state.sectorAmt);
	}

  render() {
		return (
			<div>
			  <div>
			  <form onSubmit={this.handleSubmit}>
				  <input type="text"
						value={this.state.value}
				    onChange={this.handleChange} /> 
 			      <input type="submit" value="Add coin" />
		    </form>
			  </div>
			  <div>
          <PieChart width={800} height={400}>
			      <Pie dataKey="value" data={this.state.value} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#84ca6f"/>
				  <Tooltip/>
			    </PieChart>
		   	</div>
			</div>
		);
	}
}

class Body extends React.Component {
	render () {
    return (
			<div>
				<TestPie />
			</div>
		);
	}
}

export default Body;
