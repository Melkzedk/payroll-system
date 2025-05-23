import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './pages/EmployeeList';
import Payslip from './pages/Payslip'; // ✅ Import the Payslip component

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/payslip/:id" element={<Payslip />} /> {/* ✅ Add this route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
