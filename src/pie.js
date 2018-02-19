import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

class Form extends React.Component {
	state = { coinAmount: '' }
  handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state.coinAmount);
		this.props.onSubmit();
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
			  </div>
			  <div>
          <PieChart width={800} height={400}>
			      <Pie dataKey="value" data={this.state.slices} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#84ca6f"/>
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
