const API_URL = 'https://randomuser.me/api/';

export const fetchEmployees = async (count = 10) => {
  try {
    const response = await fetch(`${API_URL}?results=${count}&seed=google`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const fetchEmployeeDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}?results=1&seed=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};
