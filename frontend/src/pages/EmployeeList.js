import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeeService.getEmployees().then(res => setEmployees(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>${emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
