import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

const data00 = [{name: "one", value: 400}, {name: "two", value: 600}];

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
	{name: 'Group C', value: 300}, {name: 'Group D', value: 200},
	{name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
	{name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
	{name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

class TestPie extends React.Component {
  render() {
		return (
      <PieChart width={800} height={400}>
			  <Pie dataKey="value" data={data00} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#84ca6f"/>
				<Tooltip/>
			</PieChart>
		);
	}
}

class SimplePieChart extends React.Component {
	render () {
		return (
			<PieChart width={800} height={400}>
				<Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
				<Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
				<Tooltip/>
				</PieChart>
		);
	}
}

class Body extends React.Component {
	render () {
    return (
			<div>
			  <div>
				  <TestPie />
				</div>
				<div>
					<SimplePieChart />
				</div>
			</div>
		);
	}
}


export default Body;
