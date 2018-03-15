import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

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
		// this part creates a data object for this.state.sectors
		this.state = {
			newName: '',
			adding: false,
			sectors: [
				{ name: '', value: 0},
		  ]
	  };
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
					  <UserInput
						  name={sector.name}
							key={sector.name}
							value={sector.value}
							onChange={this.handleSectorAmount} />
					)}
						<button onClick={ () => this.setState({adding: true})}>add</button>
				  </div>
				}
				<PieChart width={800} height={400}>
				<Pie dataKey="value"
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
