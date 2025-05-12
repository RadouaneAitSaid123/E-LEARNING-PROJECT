import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuizBuilder from '../QuizBuilder/QuizBuilder';
import ImageUploader from '../ImageUploader/ImageUploader';
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(206, 13, 13, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #444;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  background-color: #0056D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;
const Button2 = styled(Button)`
  background-color: #878678;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px hsla(0, 0.00%, 0.00%, 0.10);
  
  &:hover {
    background-color:#6c6c5e;
    color: white;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
`;

const SectionContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h4`
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #eee;
`;

const CourseForm = ({ courseId, initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || '',
    level: initialData?.level || 'Beginner',
    duration: initialData?.duration || '',
    sections: [{ title: '', content: '' }],
    quiz: { questions: [] }
  });

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: imageUrl,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      sections: updatedSections
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '' }]
    }));
  };

  const removeSection = (index) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      sections: updatedSections
    }));
  };

  const handleQuizChange = (quizData) => {
    setFormData(prev => ({
      ...prev,
      quiz: quizData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      alert('Please enter a course title');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a course description');
      return;
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      alert('Please enter a valid price');
      return;
    }
    
    // Check if at least one section has content
    const hasValidSection = formData.sections.some(
      section => section.title.trim() && section.content.trim()
    );
    
    if (!hasValidSection) {
      alert('Please add at least one section with title and content');
      return;
    }
    
    // Format the data
    const courseData = {
      ...formData,
      price: parseFloat(formData.price),
      // Filter out empty sections
      sections: formData.sections.filter(
        section => section.title.trim() && section.content.trim()
      ),
      // Only include quiz if it has questions
      quiz: formData.quiz.questions.length > 0 ? formData.quiz : null
    };
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(courseData);
    } catch (error) {
      console.error('Error submitting course:', error);
      alert('Failed to save course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Titre du cours *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="price">Prix (€) *</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="category">Catégorie</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ex: Programming, Data Science, Web Development"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="level">Niveau</Label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="Beginner">Débutant</option>
            <option value="Intermediate">Intermédiaire</option>
            <option value="Advanced">Avancé</option>
          </select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="duration">Durée</Label>
          <Input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ex: 4 weeks, 10 hours"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Image du cours</Label>
          <ImageUploader
            onImageUpload={(imageUrl) => setFormData(prev => ({...prev, imageUrl}))}
            initialImage={formData.imageUrl}
          />
        </FormGroup>
        
        <Divider />
        
        <SectionTitle>Course Content</SectionTitle>
        
        {formData.sections.map((section, index) => (
          <SectionContainer key={index}>
            <SectionHeader>
              <SectionTitle>Section {index + 1}</SectionTitle>
              {formData.sections.length > 1 && (
                <DangerButton type="button" onClick={() => removeSection(index)}>
                  Remove
                </DangerButton>
              )}
            </SectionHeader>
            
            <FormGroup>
              <Label>Section Title</Label>
              <Input
                type="text"
                value={section.title}
                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                placeholder="Enter section title"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Section Content</Label>
              <TextArea
                value={section.content}
                onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                placeholder="Enter section content"
                required
              />
            </FormGroup>
          </SectionContainer>
        ))}
        
        <Button type="button" onClick={addSection}>
          Add Section
        </Button>
        
        <Divider />
        
        <SectionTitle>Quiz</SectionTitle>
        <QuizBuilder quizData={formData.quiz} onChange={handleQuizChange} />
        
        <Divider />
        
        <ButtonGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : courseId ? 'Update Course' : 'Create Course'}
          </Button>
          <Button2 type="button" onClick={() => navigate('/professor/courses')}>
            Cancel
          </Button2>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default CourseForm;