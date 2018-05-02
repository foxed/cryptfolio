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

export default () => <div><TestPie /></div>

class TestPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
	    newValue: '',
      adding: false,
	    sectors: []
    };
  }

  setNewValue = (event) => {
	  const { value } = event.target
	  const newValue = value ? parseInt(value, 10) : ''
	  this.setState({ newValue })
  }

  nextStep = () => {
    this.setState({ adding: true })
  }

  setNewName = (event) => {
    const { value: newName } = event.target
    this.setState({ newName})
  }

	addSector = () => {
	  this.setState(state => {
		  return {
			  sectors: [
				  ...state.sectors, {
					  name: state.newName,
					  value: state.newValue
				  }
        ],
        adding: false,
        newName: '',
        newValue: ''
      }
    })
  }

  editSectorValue = (event) => {
    const {name, value} = event.target

    this.setState(state => {
      const sectors = state.sectors.map(sector => {
        if (sector.name !== name) return sector
        return {
          name,
          value: value ? parseInt(value, 10) : ''
        }
      })
      return {sectors}
    })
  };

  render() {
	  const { sectors, newValue, newName } = this.state
	  const allSectors = newValue
		  ? sectors.concat({ name: 'new value', value: newValue })
		  : sectors

    return (
      <glamorous.Div maxWidth={600} margin="auto" fontSize={24}>
        <MainGrid css={{
					marginBottom: 30,
					marginTop: 20}}>
          <HeaderFooter css={{
					  gridArea: 'header' }}>
					  cryptfolio</HeaderFooter>
          <Box css={{
				    gridArea: 'content'}}>
            {this.state.adding ? <div>
              <UserInput
                name=''
                placeholder="coin name"
                value={newName}
                onChange={this.setNewName}/>

              <Button onClick={this.addSector}>ADD SECTOR</Button>
            </div>
            : <div>
              <UserInput
                name='coin value'
                type='number'
                value={newValue}
                onChange={this.setNewValue}/>

              <Button onClick={this.nextStep}>NEXT STEP</Button>

              <br /> <br />

              {sectors.map(sector => (
                <UserInput
                  type='number'
                  name={sector.name}
                  key={sector.name}
                  value={sector.value}
                  onChange={this.editSectorValue}/>
              ))}
            </div>
           }
        <PieChart width={800} height={400}>
          <Pie
            dataKey="value"
            data={allSectors}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80} >
              {allSectors.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]}/>
              ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </Box>
    </MainGrid>
  </glamorous.Div>
 )}
}

const UserInput = (props) =>
  <DataDisplay>
    <label style={{ marginRight: 10 }} >{props.name}</label>

    {props.name.indexOf('STEP') === 0 && <br />}

    <input {...props} type={props.type || 'text'}/>
  </DataDisplay>
