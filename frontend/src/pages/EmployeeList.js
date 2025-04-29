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
    alert('Payslips sent to all employees!');
  };

  const handlePrintPayslip = () => {
    const printContents = payslipRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleEmailPayslip = (employee = selectedEmployee) => {
    if (!employee) return;

    const templateParams = {
      to_name: employee.name,
      to_email: employee.email,
      message: `
        Payslip Details:

        Name: ${employee.name}
        Position: ${employee.position}
        Department: ${employee.department}
        Employee ID: ${employee.employeeId}
        Basic Salary: $${employee.basicSalary}
        Allowances: $${employee.allowance}
        Deductions: $${employee.deduction}
        Net Salary: $${employee.netSalary}
        Payment Date: ${new Date(employee.paymentDate).toLocaleDateString()}
      `
    };

    return emailjs.send(
      'service_4rzlbw2',
      'service_nxnq06e',
      templateParams,
      '4RQulCjXeHXEO8tH5'
    );
  };

  const handleSendAllPayslips = async () => {
    setIsSendingAll(true);
    for (const emp of employees) {
      try {
        await handleEmailPayslip(emp);
        console.log(`Payslip sent to ${emp.name}`);
      } catch (err) {
        console.error(`Failed to send payslip to ${emp.name}`, err);
      }
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
