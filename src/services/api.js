import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Configuration d'Axios avec le token d'authentification
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Ajout d'un intercepteur pour inclure le token dans les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service pour les cours
export const courseService = {
  // Récupérer tous les cours disponibles
  getAllCourses: async () => {
    try {
      const response = await axiosInstance.get('/courses/available');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      throw error;
    }
  },
  
  // Récupérer un cours par son ID
  getCourseById: async (id) => {
    try {
      const response = await axiosInstance.get(`/courses/available/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du cours ${id}:`, error);
      throw error;
    }
  },
  
  // Récupérer les cours d'un professeur
  getProfessorCourses: async () => {
    try {
      const response = await axiosInstance.get('/courses/professor');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des cours du professeur:', error);
      throw error;
    }
  },
  
  // Créer un nouveau cours
  createCourse: async (courseData) => {
    try {
      const response = await axiosInstance.post('/courses/create', courseData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
      throw error;
    }
  },
  
  // Mettre à jour un cours
  updateCourse: async (id, courseData) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du cours ${id}:`, error);
      throw error;
    }
  },
  
  // Supprimer un cours
  deleteCourse: async (id) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du cours ${id}:`, error);
      throw error;
    }
  }
};

// Service pour les inscriptions
export const enrollmentService = {
  // Inscrire un étudiant à un cours
  enrollInCourse: async (courseId) => {
    try {
      const response = await axiosInstance.post('/enrollments', { courseId });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de l'inscription au cours ${courseId}:`, error);
      throw error;
    }
  },
  
  // Récupérer les cours auxquels un étudiant est inscrit
  getEnrolledCourses: async () => {
    try {
      const response = await axiosInstance.get('/enrollments/student');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des cours inscrits:', error);
      throw error;
    }
  }
};

// Service pour l'authentification
export const authService = {
  // Connexion
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },
  
  // Inscription
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};