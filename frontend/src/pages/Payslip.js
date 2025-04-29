import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../services/employeeService';
import { jsPDF } from 'jspdf'; // To generate PDF for downloading

function Payslip() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await employeeService.getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        console.error('Failed to fetch employee', err);
      }
    }

    fetchEmployee();
  }, [id]);

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Payslip for ${employee.name}`, 20, 20);
    doc.setFontSize(12);

    const data = [
      ['Employee ID', employee.employeeId],
      ['Email', employee.email],
      ['Department', employee.department],
      ['Position', employee.position],
      ['Basic Salary', `KES ${employee.basicSalary}`],
      ['Allowance', `KES ${employee.allowance}`],
      ['Deduction', `KES ${employee.deduction}`],
      ['Net Salary', `KES ${employee.netSalary}`],
      ['Payment Date', new Date(employee.paymentDate).toLocaleDateString()]
    ];

    let y = 30;
    data.forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, 20, y);
      y += 10;
    });

    doc.save(`${employee.name}_payslip.pdf`);
  };

  const handlePrint = () => {
    window.print(); // Will print the page
  };

  const handleClose = () => {
    navigate('/employee-list'); // Navigate back to the employee list
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Payslip for {employee.name}</h2>

      <table className="table table-striped">
        <tbody>
          <tr><th>Employee ID</th><td>{employee.employeeId}</td></tr>
          <tr><th>Email</th><td>{employee.email}</td></tr>
          <tr><th>Department</th><td>{employee.department}</td></tr>
          <tr><th>Position</th><td>{employee.position}</td></tr>
          <tr><th>Basic Salary</th><td>KES {employee.basicSalary}</td></tr>
          <tr><th>Allowance</th><td>KES {employee.allowance}</td></tr>
          <tr><th>Deduction</th><td>KES {employee.deduction}</td></tr>
          <tr><th>Net Salary</th><td>KES {employee.netSalary}</td></tr>
          <tr><th>Payment Date</th><td>{new Date(employee.paymentDate).toLocaleDateString()}</td></tr>
        </tbody>
      </table>

      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
        <button className="btn btn-success" onClick={handlePrint}>Print Payslip</button>
        <button className="btn btn-danger" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Payslip;
