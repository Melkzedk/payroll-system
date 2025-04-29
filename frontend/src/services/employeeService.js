import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const addEmployee = (employee) => axios.post(API_URL, employee);

const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data; // ✅ Return only the data (array of employees)
};

export default {
  addEmployee,
  getEmployees
};
