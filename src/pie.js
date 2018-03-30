import React from 'react'
import {PieChart, Pie, Cell, Tooltip} from 'recharts'
import glamorous from 'glamorous'
import Button from './StyledButton'

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
})

const Box = glamorous.div({
  backgroundColor: '#d3d3d3',
  borderColor: '#fff',
  borderRadius: 5,
  padding: 10,
  fontSize: '150%',
  color: '#45d40C'
})

const HeaderFooter = glamorous(Box)({textAlign: 'center', fontFamily: 'Courier New', backgroundColor: '#d3d3d3'})

const DataDisplay = glamorous.div({fontSize: 24, textAlign: 'left'})

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default () => <div><TestPie /></div>


class TestPie extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pendingValue: '',
      pendingName: '',
      sectors: [],  // this part creates a data object for this.state.sectors
      adding: false
    }
  }

  // MAIN CONCEPTS:

  // 1) STORE VALUE + NAME IN SLOTS

  setPendingValue = (event) => {
    const { value } = event.target
    const pendingValue = value ? parseInt(value, 10) : ''
    this.setState({ pendingValue })
  }

  // 1b) go to next page (simple! -- it's basically the same as if both fields were on the same page)

  nextStep = () => {
    this.setState({ adding: true })
  }

  setPendingName = (event) => {
    const { value: pendingName } = event.target
    this.setState({ pendingName })
  }

  // 2) MERGE EVERYTHING TOGETHER LOGICALLY
  // - take the 2 values (name + actual value), and make a new array item out of them
  // - immutably concat onto old array
  // - clear old values so NEW SELECTOR input looks empty
  
  addSector = () => {
    this.setState(state => {
      return {
        sectors: [
          ...state.sectors, {
            name: state.pendingName,
            value: state.pendingValue
          }
        ],
        adding: false,
        pendingValue: '',
        pendingName: ''
      }
    })
  }

  // 3) ADVANCED (edit existing values -- this is what you originally had, just renamed to be more informative)

  editCurrentValue = (event) => {
    const { name, value } = event.target

    this.setState(state => {
      const sectors = state.sectors.map(sector => {
        if (sector.name !== name) return sector // not current sector, return it unchanged
        
        // current sector, let's return a new one
        return {
          name,
          value: value ? parseInt(value, 10) : ''
        }
      })

      return { sectors }
    })
  }

  render() {
    const { sectors, pendingValue, pendingName } = this.state

    // FOR THE PIE CHARTS, merge the arrays on render every time.
    //
    // This is like what we do in `addSector`, but the difference is the state hasn't changed.
    // Instead we're temporarily merging existing states to produce a *potential* nextState. That's kinda
    // the power of this state-driven/declarative stuff. It's highly predictable + controllable 
    // in the UI where it's possible for far-reaching parts of your app to get tangled together.

    const allSectors = pendingValue
      ? sectors.concat({ name: 'NEW VALUE', value: pendingValue })
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
                  <UserInput
                    name='STEP 2 - SET NAME'
                    placeholder="name"
                    value={pendingName}
                    onChange={this.setPendingName}
                  />

                  <Button onClick={this.addSector}>create</Button>
                </div>
              : <div>

                  <UserInput
                    name='STEP 1 - SET VALUE'
                    type='number'
                    value={pendingValue}
                    onChange={this.setPendingValue}
                  />

                  <Button onClick={this.nextStep}>add</Button>

                  <br /> <br />
                  
                  {sectors.map(sector => (
                      <UserInput
                        type='number'
                        name={sector.name}
                        key={sector.name}
                        value={sector.value}
                        onChange={this.editCurrentValue}
                      />
                    ))
                  }           
                </div>
}
            <PieChart width={800} height={400}>
              <Pie
                dataKey="value"
                data={allSectors}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
              >
                {allSectors.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]}/>
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </Box>
        </MainGrid>
      </glamorous.Div>
    )
  }
}


const UserInput = (props) =>
  <DataDisplay>
    <label style={{ marginRight: 10 }} >{props.name}</label>

    {props.name.indexOf('STEP') === 0 && <br />}

    <input {...props} type={props.type || 'text'}/>
  </DataDisplay>

