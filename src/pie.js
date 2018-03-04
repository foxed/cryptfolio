import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

// const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

const sectorNames = ['Agree', 'Disagree', 'Unsure']

class UserInput extends React.Component {
	render() {
		return (
			<form>
				<input type="text"
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange} />
				<input type="submit" />
			</form>
		)
	};
}

class TestPie extends React.Component {
	constructor(props) {
		super(props);

		// this part creates a data object for this.state.sectors, like this:
		// [ { name: "Agree", value: 0 }, { name: "Disagree", value: 0 }, { name: "Unsure", value: 0 }]
		this.state = {
			sectors: sectorNames.map(sectorName => ({ name: sectorName, value: 0 }))
		};

		this.handleSectorAmount = this.handleSectorAmount.bind(this);
	}

	handleSectorAmount = (event) => {
		// retrieve the name and value from the input
		const sectorName = event.target.name;
		const sectorValue = event.target.value;

		// create a new sectors array with this sector's name and value
		// if it already exists, it'll be updated
		const sectors = this.state.sectors.map(sector => {
			// not current sector, return it unchanged
			if (sector.name !== sectorName) return sector

			// current sector, let's return a new one
			return {
				name: sectorName,
				value: parseInt(sectorValue, 10)
			}
		})

		// done, let's set the new sector values
		this.setState({ sectors });
		console.log(this.state);
	};

	render() {
		return (
			<div>
				{sectorNames.map(sectorName =>
					<UserInput name={sectorName} key={sectorName} value={this.state.sectors.find(s => s.name === sectorName).value} onChange={this.handleSectorAmount.bind(this)} />
				)}
				<PieChart width={800} height={400}>
					<Pie dataKey="value"
						data={this.state.sectors}
						cx={500}
						cy={200}
						innerRadius={40}
						outerRadius={80}
						fill="#84ca6f" />
					<Tooltip />
				</PieChart>
			</div>
		)
	};
}

class Body extends React.Component {
	render() {
		return (
			<div>
				<TestPie />
			</div>
		);
	}
}

export default Body;
