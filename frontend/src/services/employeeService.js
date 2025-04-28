import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const addEmployee = (employee) => axios.post(API_URL, employee);
const getEmployees = () => axios.get(API_URL);

export default {
  addEmployee,
  getEmployees
};
