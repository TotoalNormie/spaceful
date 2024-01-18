import axios from 'axios';

const API_URL = 'your_authentication_api_url';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const logout = async () => {
  // Implement logout logic, e.g., revoke tokens on the server
};

export const checkAuthentication = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // User is not authenticated
    return false;
  }

  try {
    const response = await axios.get(`${API_URL}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
