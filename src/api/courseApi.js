import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Ajustez selon votre configuration backend

// Fonction pour récupérer le token d'authentification du localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configuration d'Axios avec le token d'authentification
const getAuthHeader = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };
};

// Récupérer tous les cours d'un professeur
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses/professor`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    throw error;
  }
};

// Récupérer un cours spécifique
export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du cours ${id}:`, error);
    throw error;
  }
};

// Créer un nouveau cours
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}/courses/create`, courseData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    throw error;
  }
};

// Mettre à jour un cours existant
export const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}/courses/${id}`, courseData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du cours ${id}:`, error);
    throw error;
  }
};

// Supprimer un cours
export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/courses/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du cours ${id}:`, error);
    throw error;
  }
};

// Obtenir les statistiques du professeur
export const getProfessorStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/professor/stats`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};