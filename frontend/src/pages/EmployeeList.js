import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployees() {
      const data = await employeeService.getEmployees();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error("Expected array, got:", data);
        setEmployees([]);
      }
    }

    fetchEmployees();
  }, []);

  const handleSendAllPayslips = () => {
    // Placeholder — link to your actual bulk email logic
    alert('Payslips sent to all employees!');
  };

  const handleDeactivate = (employeeId) => {
    // You can replace this with an API call to update "status" in DB
    alert(`Employee ${employeeId} deactivated.`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee List</h2>
        <button className="btn btn-warning" onClick={handleSendAllPayslips}>
          Send Payslip to All
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Net Salary</th>
            <th>Payment Date</th>
            <th>Actions</th>
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
              <td>KES {employee.netSalary?.toLocaleString()}</td>
              <td>{new Date(employee.paymentDate).toLocaleDateString()}</td>
              <td>
                <div className="d-flex flex-column gap-1">
                  <a 
                    href={`mailto:${employee.email}`} 
                    className="btn btn-sm btn-outline-primary"
                  >
                    Send Email
                  </a>
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/payslip/${employee._id}`)}
                  >
                    View Payslip
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeactivate(employee._id)}
                  >
                    Deactivate
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
