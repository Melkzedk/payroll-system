import React, { useEffect, useRef, useState } from 'react';
import employeeService from '../services/employeeService';
import html2pdf from 'html2pdf.js';
import emailjs from '@emailjs/browser';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSendingAll, setIsSendingAll] = useState(false);
  const payslipRef = useRef();

  useEffect(() => {
    employeeService.getEmployees().then(res => setEmployees(res.data));
  }, []);

  const handleViewPayslip = (employee) => {
    setSelectedEmployee(employee);
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const handleClosePayslip = () => {
    setSelectedEmployee(null);
    document.body.style.overflow = 'auto'; // restore scroll
  };

  const handleDownloadPayslip = () => {
    const element = payslipRef.current;
    html2pdf().from(element).save(`${selectedEmployee.fullName}_payslip.pdf`);
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
      to_name: employee.fullName,
      to_email: employee.email,
      message: `
        Payslip Details:

        Name: ${employee.fullName}
        Position: ${employee.position}
        Department: ${employee.department}
        Employee ID: ${employee.employeeId}
        Basic Salary: $${employee.basicSalary}
        Allowances: $${employee.allowances}
        Deductions: $${employee.deductions}
        Net Salary: $${employee.netSalary}
        Payment Date: ${new Date(employee.paymentDate).toLocaleDateString()}
      `
    };

    return emailjs.send(
      'service_4rzlbw2',       // your EmailJS service ID
      'service_nxnq06e',      // your EmailJS template ID
      templateParams,
      '4RQulCjXeHXEO8tH5'     // your EmailJS public key
    );
  };

  const handleSendAllPayslips = async () => {
    setIsSendingAll(true);
    for (const emp of employees) {
      try {
        await handleEmailPayslip(emp);
        console.log(`Payslip sent to ${emp.fullName}`);
      } catch (err) {
        console.error(`Failed to send payslip to ${emp.fullName}`, err);
      }
    }
    setIsSendingAll(false);
    alert('All payslips sent!');
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>

      <button
        className="btn btn-danger mb-3"
        onClick={handleSendAllPayslips}
        disabled={isSendingAll}
      >
        {isSendingAll ? 'Sending...' : 'Send All Payslips'}
      </button>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-light">
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
      </div>

      {/* Payslip Modal */}
      {selectedEmployee && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" ref={payslipRef}>
              <div className="modal-header">
                <h5 className="modal-title">Payslip</h5>
                <button type="button" className="btn-close" onClick={handleClosePayslip}></button>
              </div>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleDownloadPayslip}>Download</button>
                <button className="btn btn-success" onClick={handlePrintPayslip}>Print</button>
                <button className="btn btn-warning" onClick={() => handleEmailPayslip()}>Email</button>
                <button className="btn btn-secondary" onClick={handleClosePayslip}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
