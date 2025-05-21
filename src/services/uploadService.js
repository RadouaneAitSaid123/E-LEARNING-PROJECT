import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Service pour gérer les uploads de fichiers
export const uploadService = {
    // Upload d'image
    uploadImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/upload/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data.imageUrl;
        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image:', error);
            throw error;
        }
    },

    // Upload de vidéo avec le backend réel
    uploadVideo: async (videoFile, onProgressUpdate = null) => {
        try {
            // Création du FormData pour envoyer le fichier
            const formData = new FormData();
            formData.append('video', videoFile);

            // Récupération du token d'authentification
            const token = localStorage.getItem('token');

            // Configuration pour suivre la progression de l'upload
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Ajouter la configuration pour suivre la progression si callback fourni
            if (onProgressUpdate) {
                config.onUploadProgress = (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgressUpdate(percentCompleted);
                };
            }

            // Appel au backend
            const response = await axios.post(`${API_URL}/upload/video`, formData, config);

            // Vérifier la réponse du serveur
            if (response.data.success) {
                // Construire l'URL complète pour la prévisualisation
                const baseUrl = window.location.origin;
                const objectUrl = baseUrl + response.data.filePath;

                return {
                    relativePath: response.data.filePath,
                    fileName: response.data.fileName,
                    objectUrl: objectUrl,
                    mimeType: response.data.mimeType
                };
            } else {
                throw new Error(response.data.message || 'Échec de l\'upload de la vidéo');
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload de la vidéo:', error);
            throw error;
        }
    },

    // Suppression de vidéo
    deleteVideo: async (fileName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/video?fileName=${encodeURIComponent(fileName)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data.success;
        } catch (error) {
            console.error('Erreur lors de la suppression de la vidéo:', error);
            throw error;
        }
    },

    // Vérification de la configuration du système pour les uploads
    checkUploadConfig: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/check`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Erreur lors de la vérification de la configuration:', error);
            return {
                configured: false,
                directory: 'error',
                permissions: 'error'
            };
        }
    }
};