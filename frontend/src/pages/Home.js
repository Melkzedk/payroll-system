import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-3">Welcome to the Payroll System</h1>
      <p className="lead mb-4">Manage employees and payroll easily, accurately, and securely.</p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/add-employee" className="btn btn-primary btn-lg">
          Add New Employee
        </Link>
        <Link to="/employee-list" className="btn btn-outline-secondary btn-lg">
          View Employee List
        </Link>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3940/3940436.png"
        alt="Payroll Illustration"
        className="img-fluid mt-5"
        style={{ maxHeight: '300px' }}
      />
    </div>
  );
}

export default Home;
