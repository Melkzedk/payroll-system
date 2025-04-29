const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowance: { type: Number, default: 0 },
  deduction: { type: Number, default: 0 },
  netSalary: { type: Number },
  paymentDate: { type: Date, required: true },

  // ➕ Add this:
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
