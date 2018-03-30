import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';
import glamorous from 'glamorous';
import Button from './StyledButton';

const MainGrid = glamorous.div({
  margin: 'auto',
  backgroundColor: '#fff',
  color: '#444',
  '@supports (display: grid)': {
    display: 'grid',
    gridGap: 10,
    gridTemplateAreas: `
    "....... header header"
    "sidebar content content"
    "footer footer footer"
    `
  }
});

const Box = glamorous.div({
  backgroundColor: '#d3d3d3',
  borderColor: '#fff',
  borderRadius: 5,
  padding: 10,
  fontSize: '150%',
  color: '#45d40C'
});

const HeaderFooter = glamorous(Box)({textAlign: 'center', fontFamily: 'Courier New', backgroundColor: '#d3d3d3'});

const DataDisplay = glamorous.div({fontSize: 24, textAlign: 'left'});

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
      sectors: [],
      pendingValue: null
    };
  }

  handleSectorAmount = (event) => {
    // retrieve the name and value from the input
    const sectorName = event.target.name;
    const sectorValue = event.target.value;

    this.setState(state => {
      // create a new sectors array with this sector's name and value if it already
      // exists, it'll be updated
      const sectors = state
        .sectors
        .map(sector => {
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

  // MAIN CONCEPTS:

  // 1) STORE VALUE + NAME IN SLOTS
  setPendingValue = (event) => {
    const { value } = event.target
    const pendingValue = parseInt(value, 10)
    this.setState({ pendingValue })
  }

  setPendingName = (event) => {
    const { value: newName } = event.target
    this.setState({ newName })
  }

  // 2) MERGE EVERYTHING TOGETHER LOGICALLY
  // -- take the 2 values, make a new array item
  // -- concat with old eray
  // -- clear old values so NEW SELECTOR input looks empty
  
  addSector = () => {
    this.setState(state => {
      return {
        sectors: [
          ...state.sectors, {
            name: state.newName,
            value: state.pendingValue
          }
        ],
        adding: false,
        pendingValue: null,
        newName: ''
      }
    })
  }

  render() {
    const { pendingValue: value, sectors } = this.state

    // FOR THE PIE CHARTS, merge the arrays on render every time
    // at the end of submitting one, there is no value, so u can just show all sectors
    // but when ur adding one, we basically gotta perform the same merge the finalizes it
    // but just kinda temporarily
    const allSectors = value
      ? sectors.concat({ name: 'NEW VALUE', value })
      : sectors

    return (
      <glamorous.Div maxWidth={600} margin="auto" fontSize={24}>
        <MainGrid css={{
          marginBottom: 30,
          marginTop: 20
        }}>
          <HeaderFooter css={{
            gridArea: 'header'
          }}>cryptfolio</HeaderFooter>
          <Box css={{
            gridArea: 'content'
          }}>
            {this.state.adding
              ? <div>
                  <input
                    placeholder="name"
                    value={this.state.newName}
                    onChange={this.setPendingName}
                  />

                  <Button onClick={this.addSector}>create</Button>
                </div>
              : <div>
                  {this
                    .state
                    .sectors
                    .map(sector => (
                      <UserInput
                        name={sector.name}
                        key={sector.name}
                        value={sector.value}
                        onChange={this.handleSectorAmount}
                      />
                    ))
                  }

                  <br /> <br /> <br />

                  <UserInput
                    name='NEW SECTOR'
                    value={value || ''}
                    onChange={this.setPendingValue}
                  />

                  <Button type="success" onClick={() => this.setState({adding: true})}>add</Button>
                </div>
}
            <PieChart width={800} height={400}>
              <Pie
                dataKey="value"
                data={allSectors}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}>
                {allSectors.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]}/>)}
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
        <TestPie/>
      </div>
    );
  }
}

export default Body;
