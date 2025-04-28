import React, { useEffect, useRef, useState } from 'react';
import employeeService from '../services/employeeService';
import html2pdf from 'html2pdf.js';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const payslipRef = useRef();

  useEffect(() => {
    employeeService.getEmployees().then(res => setEmployees(res.data));
  }, []);

  const handleViewPayslip = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClosePayslip = () => {
    setSelectedEmployee(null);
  };

  const handleDownloadPayslip = () => {
    const element = payslipRef.current;
    html2pdf().from(element).save(`${selectedEmployee.name}_payslip.pdf`);
  };

  const handlePrintPayslip = () => {
    const printContents = payslipRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>

      <table className="table table-striped">
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
              <td>{emp.fullName}</td>
              <td>{emp.position}</td>
              <td>${emp.basicSalary}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleViewPayslip(emp)}>
                  View Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payslip Modal */}
      {selectedEmployee && (
        <div className="p-4 mt-5 border rounded shadow print-section" ref={payslipRef}>
          <h3 className="text-center mb-4">Payslip</h3>
          <p><strong>Employee Name:</strong> {selectedEmployee.fullName}</p>
          <p><strong>Position:</strong> {selectedEmployee.position}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
          <hr />
          <p><strong>Basic Salary:</strong> ${selectedEmployee.basicSalary}</p>
          <p><strong>Allowances:</strong> ${selectedEmployee.allowances}</p>
          <p><strong>Deductions:</strong> ${selectedEmployee.deductions}</p>
          <hr />
          <p><strong>Net Salary:</strong> ${selectedEmployee.netSalary}</p>
          <p><strong>Payment Date:</strong> {new Date(selectedEmployee.paymentDate).toLocaleDateString()}</p>

          {/* Buttons */}
          <div className="mt-4">
            <button className="btn btn-primary me-2" onClick={handleDownloadPayslip}>
              Download Payslip
            </button>
            <button className="btn btn-success me-2" onClick={handlePrintPayslip}>
              Print Payslip
            </button>
            <button className="btn btn-secondary" onClick={handleClosePayslip}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
