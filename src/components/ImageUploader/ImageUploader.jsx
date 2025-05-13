import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ImageUploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const UploadButton = styled.label`
  display: inline-block;
  background-color: #0056D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;
  height: 180px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const ImageUploader = ({ onImageUpload, initialImage }) => {
  const [previewUrl, setPreviewUrl] = useState(initialImage || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const SERVER_BASE_URL = 'http://localhost:8080';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (initialImage) {
      // Check if the URL already includes the base URL
      let imageUrl = initialImage.startsWith('http') 
        ? initialImage 
        : `${SERVER_BASE_URL}${initialImage}`;
      
      setPreviewUrl(imageUrl);
    }
  }, [initialImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Vérifier la taille du fichier (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 10MB');
      return;
    }

    setError('');
    setUploading(true);

    // Créer un aperçu local temporaire
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    // Créer un FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/api/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // Récupérer l'URL de l'image stockée
      const imageUrl = response.data.imageUrl;
      
      // Ensure the image URL is absolute and includes authentication
      let fullImageUrl = imageUrl.startsWith('http') 
        ? imageUrl 
        : `${SERVER_BASE_URL}${imageUrl}`;
      
      // Add authentication token to the image URL
      if (!fullImageUrl.includes('token=') && token) {
        fullImageUrl = `${fullImageUrl}${fullImageUrl.includes('?') ? '&' : '?'}token=${token}`;
      }
        
      onImageUpload(response.data.imageUrl); // Keep original URL for database
      setPreviewUrl(fullImageUrl); // Use authenticated URL for display
      setUploading(false);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setError('Échec du téléchargement de l\'image. Veuillez réessayer.');
      setUploading(false);
      // Révoquer l'URL de l'objet pour libérer la mémoire
      URL.revokeObjectURL(localPreviewUrl);
    }
  };

  return (
    <ImageUploadContainer>
      <UploadButton htmlFor="course-image">
        {uploading ? 'Téléchargement...' : 'Choisir une image'}
      </UploadButton>
      <HiddenInput 
        id="course-image" 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={uploading}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ImagePreview>
        {uploading ? (
          <LoadingIndicator>Téléchargement en cours...</LoadingIndicator>
        ) : previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Aperçu" 
            onError={(e) => {
              console.error('Image loading error:', e);
              e.target.onerror = null;
              // Use a data URI instead of an external placeholder service
              e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189e969bf08%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189e969bf08%22%3E%3Crect%20width%3D%22300%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.0078125%22%20y%3D%2297.5%22%3EImage%20non%20disponible%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            }}
          />
        ) : (
          <LoadingIndicator>Aucune image sélectionnée</LoadingIndicator>
        )}
      </ImagePreview>
    </ImageUploadContainer>
  );
};

export default ImageUploader;