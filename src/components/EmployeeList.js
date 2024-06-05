import React from 'react';
import EmployeeItem from './EmployeeItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = ({ employees }) => {
  return (
    <div className="row">
      {employees.map(employee => (
        <div key={employee.login.uuid} className="col-md-4 mb-4">
          <EmployeeItem employee={employee} />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
