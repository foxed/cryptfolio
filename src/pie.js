import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

class Form extends React.Component {
	state = { coinAmount: '' }
  handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state.coinAmount);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text"
			   value={this.state.coinAmount}
				 onChange={(event) => this.setState({ coinAmount: event.target.value })}
		     placeholder="coin amount" />
				<button type="submit">Add coin</button>
		  </form>
		);
	}
}

class TestPie extends React.Component {
	state = { 
		slices: [
			{ name: "test1",
				value: 900 },
			{ name: "test2",
				value: 200 },
		]
	};

  render() {
		return (
      <PieChart width={800} height={400}>
			  <Pie dataKey="value" data={this.state.slices} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#84ca6f"/>
				<Tooltip/>
			</PieChart>
		);
	}
}

class Body extends React.Component {
	addNewSlice
	render () {
    return (
			<div>
			<center>
			  <Form onSubmit={this.addNewSlice}  />
			</center>
				<TestPie />
			</div>
		);
	}
}

export default Body;
