import React, {useState, useCallback, useEffect, useRef} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload, faVideo, faTimes} from '@fortawesome/free-solid-svg-icons';

// Composants stylisés
const UploaderContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const UploadArea = styled.div`
    border: 2px dashed ${props => props.isDragging ? '#4a90e2' : '#ddd'};
    border-radius: 4px;
    padding: 30px;
    text-align: center;
    background-color: ${props => props.isDragging ? 'rgba(74, 144, 226, 0.05)' : '#f9f9f9'};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(74, 144, 226, 0.05);
        border-color: #4a90e2;
    }
`;

const UploadIcon = styled.div`
    font-size: 2rem;
    color: #6c757d;
    margin-bottom: 10px;
`;

const UploadText = styled.p`
    margin: 0;
    color: #6c757d;
`;

const ProgressContainer = styled.div`
    width: 100%;
    margin-top: 15px;
`;

const ProgressBar = styled.div`
    height: 6px;
    background-color: #4a90e2;
    width: ${props => props.$progress}%;
    border-radius: 3px;
    transition: width 0.3s ease;
`;

const VideoPreview = styled.div`
    position: relative;
    width: 100%;

    video {
        width: 100%;
        border-radius: 4px;
        background-color: #f9f9f9;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const ErrorMessage = styled.div`
    color: #e74c3c;
    margin-top: 10px;
    font-size: 0.875rem;
`;

/**
 * Composant d'upload de vidéo pour les sections de cours
 * @param {Object} props
 * @param {Function} props.onVideoUpload - Fonction appelée après l'upload réussi avec l'URL de la vidéo
 * @param {String} props.initialVideo - URL initiale de la vidéo (si déjà téléchargée)
 */
const VideoUploader = ({onVideoUpload, initialVideo}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoType, setVideoType] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');

    // Référence pour annuler la requête d'upload si nécessaire
    const cancelTokenSource = useRef(null);

    // Initialiser avec la vidéo existante si disponible
    useEffect(() => {
        if (initialVideo) {
            setVideoUrl(initialVideo);
        }
    }, [initialVideo]);

    // Gestion du drag & drop
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    // Validation du fichier
    const validateFile = (file) => {
        // Vérifier le type de fichier
        if (!file.type.startsWith('video/')) {
            setError('Le fichier doit être une vidéo.');
            return false;
        }

        // Vérifier la taille du fichier (limite à 100MB)
        if (file.size > 100 * 1024 * 1024) {
            setError('La taille du fichier ne doit pas dépasser 100MB.');
            return false;
        }

        return true;
    };

    // Gestion du changement de fichier
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
        // Réinitialiser l'input pour permettre de sélectionner à nouveau le même fichier
        e.target.value = '';
    }, []);

    // Traitement du fichier
    const handleFile = useCallback((file) => {
        setError('');

        if (!validateFile(file)) {
            return;
        }

        uploadFile(file);
    }, []);

    // Upload du fichier vers le backend
    const uploadFile = async (file) => {
        setIsUploading(true);
        setUploadProgress(0);

        // Créer un FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append('video', file);

        // Créer un token pour pouvoir annuler la requête si nécessaire
        cancelTokenSource.current = axios.CancelToken.source();

        try {
            // Récupération du token d'authentification
            const token = localStorage.getItem('token');
            
            const response = await axios.post('http://localhost:8080/api/upload/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                cancelToken: cancelTokenSource.current.token,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.data.success) {
                // Obtenir le chemin de la vidéo depuis la réponse
                const serverPath = `http://localhost:8080${response.data.filePath}`;
                setVideoUrl(serverPath);
                setVideoType(response.data.mimeType);
                setFileName(response.data.fileName);

                // Notifier le parent du succès de l'upload
                if (onVideoUpload) {
                    onVideoUpload(serverPath);
                }
            } else {
                setError(response.data.message || 'Une erreur est survenue lors de l\'upload.');
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                setError('Upload annulé.');
            } else {
                setError(err.response?.data?.message || 'Erreur lors de l\'upload de la vidéo.');
                console.error('Erreur d\'upload:', err);
            }
        } finally {
            setIsUploading(false);
            cancelTokenSource.current = null;
        }
    };

    // Suppression de la vidéo
    const removeVideo = async () => {
        try {
            // Annuler l'upload en cours si nécessaire
            if (isUploading && cancelTokenSource.current) {
                cancelTokenSource.current.cancel('Upload annulé par l\'utilisateur');
                setIsUploading(false);
                return;
            }

            // Si c'est une vidéo qui a été téléchargée dans cette session, la supprimer du serveur
            if (fileName) {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/upload/video?fileName=${encodeURIComponent(fileName)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }

            // Réinitialiser l'état
            setVideoUrl(null);
            setVideoType('');
            setFileName('');
            setError('');

            // Notifier le parent que la vidéo a été supprimée
            if (onVideoUpload) {
                onVideoUpload('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la suppression de la vidéo.');
            console.error('Erreur de suppression:', err);
        }
    };
    
    // Fonction pour vérifier si la vidéo est chargée correctement
    const handleVideoError = () => {
        setError('Erreur lors du chargement de la vidéo. Veuillez réessayer.');
        console.error('Erreur de chargement de la vidéo:', videoUrl);
    };
    
    // Fonction pour confirmer que la vidéo est chargée correctement
    const handleVideoLoaded = () => {
        setError('');
        console.log('Vidéo chargée avec succès:', videoUrl);
    };

    return (
        <UploaderContainer>
            {videoUrl ? (
                <VideoPreview>
                    <video 
                        controls 
                        src={videoUrl} 
                        type={videoType || 'video/mp4'}
                        onError={handleVideoError}
                        onLoadedData={handleVideoLoaded}
                    >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                    <RemoveButton onClick={removeVideo}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </RemoveButton>
                </VideoPreview>
            ) : (
                <>
                    <input
                        type="file"
                        id="video-upload"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                    />
                    <UploadArea
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('video-upload').click()}
                    >
                        <UploadIcon>
                            <FontAwesomeIcon icon={isUploading ? faVideo : faUpload}/>
                        </UploadIcon>
                        <UploadText>
                            {isUploading
                                ? 'Upload en cours...'
                                : 'Glissez et déposez votre vidéo ici ou cliquez pour parcourir'}
                        </UploadText>
                        {isUploading && (
                            <ProgressContainer>
                                <ProgressBar $progress={uploadProgress}/>
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