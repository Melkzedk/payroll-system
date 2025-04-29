import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Net Salary</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.netSalary}</td>
              <td>{new Date(employee.paymentDate).toLocaleDateString()}</td>
              <td>
                <a href={`mailto:${employee.email}`} className="btn btn-sm btn-outline-primary">
                  Send Email
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
