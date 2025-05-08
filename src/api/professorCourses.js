import axios from 'axios';

/**
 * Get all courses
 * @returns {Promise} Promise object representing the courses data
 */
export function getCourses() {
  return axios.get('/api/courses');
}

/**
 * Create a new course
 * @param {Object} data - Course data
 * @returns {Promise} Promise object representing the created course
 */
export function createCourse(data) {
  return axios.post('/api/courses', data);
}

/**
 * Update an existing course
 * @param {string|number} id - Course ID
 * @param {Object} data - Updated course data
 * @returns {Promise} Promise object representing the updated course
 */
export function updateCourse(id, data) {
  return axios.put(`/api/courses/${id}`, data);
}

/**
 * Delete a course
 * @param {string|number} id - Course ID
 * @returns {Promise} Promise object representing the deletion result
 */
export function deleteCourse(id) {
  return axios.delete(`/api/courses/${id}`);
}