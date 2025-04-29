import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const addEmployee = (employee) => axios.post(API_URL, employee);

const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const deactivateEmployee = (id) => axios.patch(`${API_URL}/${id}/deactivate`);

export default {
  addEmployee,
  getEmployees,
  getEmployeeById,     // ✅ Added for Payslip page
  deactivateEmployee   // ✅ Already included
};
