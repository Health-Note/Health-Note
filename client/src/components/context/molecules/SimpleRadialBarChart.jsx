import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const style = {
  top: 100,
  left: 150,
  lineHeight: '24px',
};

export default class Example extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <RadialBarChart
        width={260}
        height={500}
        cx={100}
        cy={250}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={data}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise
          dataKey="uv"
        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    );
  }
}
