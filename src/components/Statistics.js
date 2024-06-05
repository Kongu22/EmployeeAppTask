import React from 'react';
import { useEmployeeContext } from '../context/context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Statistics = () => {
  const { employees } = useEmployeeContext();

  const ageData = employees.reduce((acc, employee) => {
    const ageGroup = Math.floor(employee.dob.age / 10) * 10;
    const ageGroupLabel = `${ageGroup}-${ageGroup + 9}`;
    acc[ageGroupLabel] = (acc[ageGroupLabel] || 0) + 1;
    return acc;
  }, {});

  const ageDataArray = Object.entries(ageData).map(([name, value]) => ({ name, value }));

  const countryData = employees.reduce((acc, employee) => {
    const country = employee.location.country;
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const countryDataArray = Object.entries(countryData).map(([name, value]) => ({ name, value }));

  return (
    <div className="container mt-3">
      <h3 className="text-center">Statistics</h3>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <h5 className="text-center">Age Distribution</h5>
          <div className="d-flex justify-content-center">
            <BarChart width={300} height={300} data={ageDataArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <h5 className="text-center">Country Distribution</h5>
          <div className="d-flex justify-content-center">
            <PieChart width={300} height={300}>
              <Pie data={countryDataArray} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
                {countryDataArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'USA' ? '#ff7300' : '#00c49f'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
