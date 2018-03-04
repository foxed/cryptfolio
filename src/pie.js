import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

//const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

class UserInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {sectorAmount: [] };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
	};

	handleChange(event){
		this.setState({sectorAmount: event.target.value});
		console.log(this.state.sectorAmount);
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="text"
					name="sectorAmount"
					onChange={this.handleChange}
					value={this.onChange}/>
				<input type="submit" />
			</form>
		)};
}

class TestPie extends React.Component {	
	constructor(props) {
    super(props);
		this.state = {
			sectorAmount: []
		};
		this.handleSectorAmount = this.handleSectorAmount.bind(this);
	}

handleSectorAmount = (value) => {
	this.setState({sectorAmount: value});
	console.log(this.state.sectorAmount);
};

  render() {
		return (
			<div>
				<UserInput onChange={this.handleSectorAmount}/>
				<PieChart width={800} height={400}>
					<Pie dataKey="value" 
							 data={this.state.sectorAmount}
							 cx={500}
							 cy={200}
							 innerRadius={40}
							 outerRadius={80}
							 fill="#84ca6f"/>
					<Tooltip />
				</PieChart>
		  </div>
		)};
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
