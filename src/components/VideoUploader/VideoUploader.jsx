import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faVideo, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isDragging ? '#f0f8ff' : '#f9f9f9'};
  
  &:hover {
    border-color: #0056D2;
    background-color: #f0f8ff;
  }
`;

const VideoPreview = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #0056D2;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #737373;
  margin: 0;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #0056D2;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const VideoUploader = ({ onVideoUpload, initialVideo }) => {
  const [videoUrl, setVideoUrl] = useState(initialVideo || '');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoUpload(files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  };
  
  const handleVideoUpload = async (file) => {
    // Vérifier le type de fichier
    if (!file.type.startsWith('video/')) {
      setError('Veuillez sélectionner un fichier vidéo valide');
      return;
    }
    
    // Vérifier la taille du fichier (limite à 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 100MB');
      return;
    }
    
    setError('');
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('video', file);
    
    try {
      const response = await axios.post('http://localhost:8080/api/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      setVideoUrl(response.data.url);
      onVideoUpload(response.data.url);
    } catch (error) {
      console.error('Erreur lors de l\'upload de la vidéo:', error);
      setError('Échec de l\'upload. Veuillez réessayer.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  const removeVideo = () => {
    setVideoUrl('');
    onVideoUpload('');
  };
  
  return (
    <UploaderContainer>
      {videoUrl ? (
        <VideoPreview>
          <video controls>
            <source src={`http://localhost:8080${videoUrl}`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <RemoveButton onClick={removeVideo}>
            <FontAwesomeIcon icon={faTimes} />
          </RemoveButton>
        </VideoPreview>
      ) : (
        <>
          <input 
            type="file" 
            id="video-upload" 
            accept="video/*" 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          <UploadArea 
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('video-upload').click()}
          >
            <UploadIcon>
              <FontAwesomeIcon icon={isUploading ? faVideo : faUpload} />
            </UploadIcon>
            <UploadText>
              {isUploading 
                ? 'Upload en cours...'
                : 'Glissez et déposez votre vidéo ici ou cliquez pour parcourir'}
            </UploadText>
            {isUploading && (
              <ProgressContainer>
                <ProgressBar progress={uploadProgress} />
              </ProgressContainer>
            )}
          </UploadArea>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploaderContainer>
  );
};

export default VideoUploader;