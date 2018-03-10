import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

// const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

//const sectorNames = ['Agree', 'Disagree', 'Unsure']

//const colors= ['#ddebf8', '#edebf0', '#cdebf3']

class UserInput extends React.Component {
	render() {
		return (
			// this is a "dumb" component
			// it just shows what we tell it to show, and tells its parent
			// if it changes through the this.props.onChange function
			<div>
				<label>{this.props.name}</label>
				<input type="number"
			name={this.props.name}
			value={this.props.value}
			onChange={this.props.onChange} />
				</div>
		)
	};
}

class TestPie extends React.Component {
	constructor(props) {
		super(props);

		// this part creates a data object for this.state.sectors, like this:
		// [ { name: "Agree", value: 0 }, { name: "Disagree", value: 0 }, { name: "Unsure", value: 0 }]
		this.state = {
			newName: '',
			adding: false,
			sectors: [
				{ name: '', value: 0},
			]
			//			sectors: sectorNames.map(sectorName => ({ name: sectorName, value: 0 }))
		};

		// bind, because, well, JavaScript :-P
		//this.handleSectorAmount = this.handleSectorAmount.bind(this);
		//	this.addSector = this.addSector.bind(this);
	}


	handleSectorAmount = (event) => {
		// retrieve the name and value from the input
		const sectorName = event.target.name;
		const sectorValue = event.target.value;

		this.setState(state => {
			// create a new sectors array with this sector's name and value
			// if it already exists, it'll be updated
			const sectors = state.sectors.map(sector => {
				// not current sector, return it unchanged
				if (sector.name !== sectorName) return sector

				// current sector, let's return a new one
				return {
					name: sectorName,
					value: parseInt(sectorValue, 10)
				}
			})
			return {sectors}
		})
	};

	addSector = () => {
		this.setState(state => {
			return {
				sectors: [
					...state.sectors,
					{name: state.newName, value: 0}
				],
				adding: false
			}
		})
	}

	render() {
		return (
			<div>
				{this.state.adding ? 
					<div>
						<input 
					value={this.state.newName}
					placeholder="name"
					onChange={ (event) => this.setState({ newName: event.target.value })}/>
						<button onClick={this.addSector}>create</button>
						</div>
						:	
						<div>
						{this.state.sectors.map(sector =>
							// map/loop through and show user inputs for each sector
							<UserInput
							// name comes from our sectorNames array
							name={sector.name}
							// key allows React to update this more efficiently
							key={sector.name}
							// value comes from this.state.sectors
							// but we have to use `.find(...).value` because it's in an
							// array and we have to find the right one (with this name)
							// and pull out the value
							value={sector.value}
							// onChange prop is passed down so we can capture any changes
							onChange={this.handleSectorAmount} />
						)}
						<button onClick={ () => this.setState({adding: true})}>add</button>
						</div>}

				<PieChart width={800} height={400}>
				<Pie dataKey="value"
			// this.state.sectors is already in a format we understand,
			// so we don't have to transform it ("derive" it)
			data={this.state.sectors}
			cx={500}
			cy={200}
			innerRadius={40}
			outerRadius={80} />
				<Tooltip/>
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
