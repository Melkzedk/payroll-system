import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../services/employeeService';

function AddEmployee() {
  const [employee, setEmployee] = useState({ 
    name: '', 
    employeeId: '',
    department: '',
    position: '', 
    basicSalary: '', 
    allowance: '', 
    deduction: '', 
    paymentDate: '',
    email: ''  // ➕ Added email
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const netSalary = 
      Number(employee.basicSalary) + 
      Number(employee.allowance || 0) - 
      Number(employee.deduction || 0);

    const newEmployee = {
      ...employee,
      netSalary
    };

    await employeeService.addEmployee(newEmployee);

    alert('Employee Added Successfully!');
    navigate('/employee-list');
  };

  return (
    <div className="container mt-5">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-3" name="name" placeholder="Full Name" value={employee.name} onChange={handleChange} required />
        <input type="text" className="form-control mb-3" name="employeeId" placeholder="Employee ID" value={employee.employeeId} onChange={handleChange} required />
        <input type="email" className="form-control mb-3" name="email" placeholder="Email Address" value={employee.email} onChange={handleChange} required />
        <input type="text" className="form-control mb-3" name="department" placeholder="Department" value={employee.department} onChange={handleChange} required />
        <input type="text" className="form-control mb-3" name="position" placeholder="Position" value={employee.position} onChange={handleChange} required />
        <input type="number" className="form-control mb-3" name="basicSalary" placeholder="Basic Salary" value={employee.basicSalary} onChange={handleChange} required />
        <input type="number" className="form-control mb-3" name="allowance" placeholder="Allowance" value={employee.allowance} onChange={handleChange} />
        <input type="number" className="form-control mb-3" name="deduction" placeholder="Deduction" value={employee.deduction} onChange={handleChange} />
        <input type="date" className="form-control mb-3" name="paymentDate" placeholder="Payment Date" value={employee.paymentDate} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
