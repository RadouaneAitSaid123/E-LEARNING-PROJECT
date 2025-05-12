import React, { useState } from 'react';
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
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
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // Récupérer l'URL de l'image stockée
      const imageUrl = response.data.imageUrl;
      onImageUpload(imageUrl);
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
          <img src={previewUrl} alt="Aperçu" />
        ) : (
          <LoadingIndicator>Aucune image sélectionnée</LoadingIndicator>
        )}
      </ImagePreview>
    </ImageUploadContainer>
  );
};

export default ImageUploader;