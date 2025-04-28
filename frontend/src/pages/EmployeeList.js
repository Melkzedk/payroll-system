import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    employeeService.getEmployees().then(res => setEmployees(res.data));
  }, []);

  const handleViewPayslip = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClosePayslip = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Basic Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>${emp.basicSalary}</td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => handleViewPayslip(emp)}>
                  View Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payslip Modal */}
      {selectedEmployee && (
        <div className="p-4 mt-5 border rounded shadow">
          <h3>Payslip</h3>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <p><strong>Position:</strong> {selectedEmployee.position}</p>
          <p><strong>Basic Salary:</strong> ${selectedEmployee.basicSalary}</p>
          <p><strong>Allowance:</strong> ${selectedEmployee.allowance}</p>
          <p><strong>Deduction:</strong> ${selectedEmployee.deduction}</p>
          <p><strong>Net Salary:</strong> ${selectedEmployee.netSalary}</p>
          <p><strong>Payment Date:</strong> {new Date(selectedEmployee.paymentDate).toLocaleDateString()}</p>

          <button className="btn btn-secondary mt-3" onClick={handleClosePayslip}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
