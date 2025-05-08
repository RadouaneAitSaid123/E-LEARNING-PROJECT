import axios from 'axios';

/**
 * Get professor dashboard statistics
 * @returns {Promise} Promise object representing the dashboard statistics
 */
export function getProfessorStats() {
  return axios.get('/api/dashboard');
}