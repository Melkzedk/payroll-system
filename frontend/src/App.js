import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
