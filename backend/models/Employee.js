// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  email: { type: String, required: true },  // ➕ Added email
  department: { type: String, required: true },
  position: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowance: { type: Number, default: 0 },
  deduction: { type: Number, default: 0 },
  netSalary: { type: Number },
  paymentDate: { type: Date, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
