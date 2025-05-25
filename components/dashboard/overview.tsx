"use client"

import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "NMD",
    total: 8,
  },
  {
    name: "THN",
    total: 10,
  },
  {
    name: "NSK",
    total: 4,
  },
  {
    name: "RGD",
    total: 3,
  },
  {
    name: "MLD",
    total: 4,
  },
  {
    name: "PLG",
    total: 3,
  },
  {
    name: "PSD",
    total: 1,
  },
  {
    name: "CSD",
    total: 0,
  },
  {
    name: "RTC",
    total: 1,
  },
]



export  function Overview (){
  
 
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart 
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${value}`}
        />
        
        <Tooltip />
          <Legend className="text-dark100_light900"/>
          
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary text-dark100_light900"
          activeBar={<Rectangle fill="orange" stroke="yellow" />} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}


