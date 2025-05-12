import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Ajustez selon votre configuration backend

// Récupérer tous les cours disponibles
export const getAvailableCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses/available`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cours disponibles:', error);
    throw error;
  }
};

// Récupérer les détails d'un cours spécifique
export const getAvailableCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/courses/available/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du cours ${courseId}:`, error);
    throw error;
  }
};

// S'inscrire à un cours
export const enrollInCourse = async (courseId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/enrollments`, { courseId, userId });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription au cours:', error);
    throw error;
  }
};