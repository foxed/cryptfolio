import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import glamorous from 'glamorous';
import Button from './StyledButton';

const MainGrid = glamorous.div({
  margin: 'auto',
	backgroundColor: '#fff',
	color: '#444',
	'@supports (display: grid)':{
		display: 'grid',
		gridGap: 10,
		gridTemplateAreas: `
		"....... header header"
		"sidebar content content"
		"footer footer footer"
		`,
	},
});

const Box = glamorous.div({
	backgroundColor: '#d3d3d3',
	borderColor: '#fff',
	borderRadius: 5,
	padding: 10,
	fontSize: '150%',
	color: '#45d40C'
});

const HeaderFooter = glamorous(Box)({
	textAlign: 'center',
	fontFamily: 'Courier New',
	backgroundColor: '#d3d3d3',
});

const DataDisplay = glamorous.div({
	fontSize: 24,
	textAlign: 'left'
});

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class UserInput extends React.Component {
	render() {
		return (
			// this is a "dumb" component
			// it just shows what we tell it to show, and tells its parent
			// if it changes through the this.props.onChange function
			<DataDisplay>
				<div>
				<label>{this.props.name}</label>
				</div>
				<div>
				<input type="number"
			name={this.props.name}
			value={this.props.value}
			onChange={this.props.onChange} />
				</div>
				</DataDisplay>
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
				{ name: '', value: ''},
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
			<glamorous.Div maxWidth={600} margin="auto" fontSize={24}>
				<MainGrid css={{ marginBottom: 30, marginTop: 20}}>
				  <HeaderFooter css={{ gridArea: 'header' }}>cryptfolio</HeaderFooter>
				  <Box css={{ gridArea: 'content'}}>

				  {this.state.adding ?
					  <div>
						  <input
					      value={this.state.newName}
					      placeholder="name"
					      onChange={ (event) => this.setState({ newName: event.target.value })}/>
						   <Button
								 onClick={this.addSector}>create</Button>
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
						  <Button
							  type="success"
							  onClick={ () => this.setState({adding: true})}>add</Button>
						</div>
				}
				    <PieChart width={800} height={400}>
				      <Pie
						    dataKey="value"
			          data={this.state.sectors}
			          cx={500}
			          cy={200}
			          innerRadius={40}
			          outerRadius={80}>      
                {this.state.sectors.map((entry, index) => <Cell fill={colors[index % colors.length]}/>)}
			        </Pie>
				      <Tooltip/>
				    </PieChart>
			   </Box>
		   </MainGrid>
		 </glamorous.Div>
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
