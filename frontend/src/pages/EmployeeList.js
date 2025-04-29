import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_9d5p3ud';
const TEMPLATE_ID = 'service_nxnq06e';
const PUBLIC_KEY = '4RQulCjXeHXEO8tH5';

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

  const sendPayslip = (employee) => {
    const templateParams = {
      to_name: employee.name,
      to_email: employee.email,
      employee_id: employee.employeeId,
      department: employee.department,
      position: employee.position,
      net_salary: `KES ${employee.netSalary}`,
      payment_date: new Date(employee.paymentDate).toLocaleDateString(),
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert(`Payslip sent to ${employee.name}`);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert(`Failed to send payslip to ${employee.name}`);
      });
  };

  const handleSendAllPayslips = () => {
    employees.forEach(emp => {
      if (emp.status !== 'inactive') sendPayslip(emp);
    });
    alert('Payslips are being sent to all employees!');
  };

  const handleDeactivate = async (employeeId) => {
    try {
      await employeeService.deactivateEmployee(employeeId);
      alert(`Employee ${employeeId} deactivated.`);
      setEmployees((prev) =>
        prev.map(emp =>
          emp._id === employeeId ? { ...emp, status: 'inactive' } : emp
        )
      );
    } catch (err) {
      alert('Failed to deactivate employee.');
      console.error(err);
    }
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className={employee.status === 'inactive' ? 'table-secondary' : ''}>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>KES {employee.netSalary?.toLocaleString()}</td>
              <td>{new Date(employee.paymentDate).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${employee.status === 'inactive' ? 'bg-danger' : 'bg-success'}`}>
                  {employee.status || 'active'}
                </span>
              </td>
              <td>
                <div className="d-flex flex-column gap-1">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => sendPayslip(employee)}
                  >
                    Send Email
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/payslip/${employee._id}`)}
                  >
                    View Payslip
                  </button>
                  {employee.status !== 'inactive' && (
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeactivate(employee._id)}
                    >
                      Deactivate
                    </button>
                  )}
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
