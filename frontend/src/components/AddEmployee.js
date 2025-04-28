import React, { useState } from 'react';
import employeeService from '../services/employeeService';

function AddEmployee() {
  const [employee, setEmployee] = useState({ name: '', position: '', salary: '' });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await employeeService.addEmployee(employee);
    setEmployee({ name: '', position: '', salary: '' });
    alert('Employee Added Successfully!');
  };

  return (
    <div className="container mt-5">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-3" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
        <input type="text" className="form-control mb-3" name="position" placeholder="Position" value={employee.position} onChange={handleChange} required />
        <input type="number" className="form-control mb-3" name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
