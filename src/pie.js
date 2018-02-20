import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Sector, Tooltip } from 'recharts';

//const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

const Slice = (props) => {
	return (
		<div style={{margin: '2em', marginLeft: 400}}>
			<div>
			{props.name}
			</div>
			<div>
			{props.amount}
		  </div>
		</div>
	)
};

const SliceList = (props) => {
	return (
	  <div>
		  {props.slices.map(slice => <Slice {...slice} />)}
		</div>
	);
}


class Form extends React.Component {
	constructor() {
		super(); // not sure this is needed, read up more on super constructor
		this.state = {
			coinAmount: ''
		}; // is this handling the right data?
	}
	
  state = { coinAmount: '' }
  handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit();
		const { coinAmount } = this.state //is this handling the right data?
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}> 
				<input type="text"
			   value={this.state.coinAmount}
				 onChange={(event) => this.setState ({ coinAmount: event.target.value })} /> 
 			<button type="submit">Add coin</button>
		  </form>
		);
	}
}
// AHHH read about all these damn blankChanges and blankSubmits
// maybe move out onchange? 
const data = [{name: "group1", value: 500}, {name: "group2", value: 400}]; // just to test colors mapping to cells

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class TestPie extends React.Component {
	state = {
		slices: []
	};

	addNewSlice = (sliceData) => {  // WIP, goal: adding the user inputted slices in to form the pie chart
		this.setState(prevState => ({
			slices: prevState.slices.concat(sliceData)
		}));
	};

  render() {
		return (
			<div>
			  <div>
				  <Form onSubmit={this.addNewSlice} />
				  <SliceList slices={this.state.slices} />
			  </div>
			  <div>
          <PieChart width={800} height={400}>
		      <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80}>
					 { data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
					</Pie>
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
