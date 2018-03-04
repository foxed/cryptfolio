import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

// const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

const sectorNames = ['Agree', 'Disagree', 'Unsure']

class UserInput extends React.Component {
  render() {
    return (
      // this is a "dumb" component
      // it just shows what we tell it to show, and tells its parent
      // if it changes through the this.props.onChange function
      <input type="text"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange} />
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

    // bind, because, well, JavaScript :-P
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
          // map/loop through and show user inputs for each sector
          <UserInput
            // name comes from our sectorNames array
            name={sectorName}
            // key allows React to update this more efficiently
            key={sectorName}
            // value comes from this.state.sectors
            // but we have to use `.find(...).value` because it's in an
            // array and we have to find the right one (with this name)
            // and pull out the value
            value={this.state.sectors.find(s => s.name === sectorName).value}
            // onChange prop is passed down so we can capture any changes
            onChange={this.handleSectorAmount} />
        )}

        <PieChart width={800} height={400}>
          <Pie dataKey="value"
            // this.state.sectors is already in a format we understand,
            // so we don't have to transform it ("derive" it)
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
