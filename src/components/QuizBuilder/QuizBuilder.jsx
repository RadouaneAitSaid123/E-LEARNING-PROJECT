import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1.5rem;
  background-color: #f9f9f9;
`;

const QuestionContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const QuestionNumber = styled.h4`
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  background-color: #f9f9f9;
  color: #333;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: ${props => props.$isCorrect ? '#e6f7e6' : 'white'};
`;

const ChoiceInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const SmallButton = styled(Button)`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
`;

const DangerButton = styled(SmallButton)`
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
`;


const NoQuestionsMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
`;

const QuizBuilder = ({ quizData, onChange }) => {
  const [quiz, setQuiz] = useState({ questions: [] });

  useEffect(() => {
    if (quizData && quizData.questions) {
      setQuiz(quizData);
    }
  }, [quizData]);

  const handleQuestionTextChange = (index, text) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      questionText: text
    };
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const handleChoiceTextChange = (questionIndex, choiceIndex, text) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].choices[choiceIndex].text = text;
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const setCorrectChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...quiz.questions];
    
    // Set all choices to incorrect first
    updatedQuestions[questionIndex].choices.forEach((choice, idx) => {
      choice.isCorrect = idx === choiceIndex;
    });
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const addChoice = (questionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].choices.push({
      text: '',
      isCorrect: false
    });
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const removeChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
    
    // If we removed the correct choice, set the first choice as correct (if any exist)
    const hasCorrectChoice = updatedQuestions[questionIndex].choices.some(choice => choice.isCorrect);
    if (!hasCorrectChoice && updatedQuestions[questionIndex].choices.length > 0) {
      updatedQuestions[questionIndex].choices[0].isCorrect = true;
    }
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const addQuestion = () => {
    const newQuestion = {
      questionText: '',
      choices: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false }
      ]
    };
    
    const updatedQuiz = { 
      ...quiz, 
      questions: [...quiz.questions, newQuestion] 
    };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    onChange(updatedQuiz);
  };

  return (
    <QuizContainer>
      <h3>Quiz Questions</h3>
      
      {quiz.questions.length === 0 ? (
        <NoQuestionsMessage>No questions added yet. Add your first question below.</NoQuestionsMessage>
      ) : (
        quiz.questions.map((question, questionIndex) => (
          <QuestionContainer key={questionIndex}>
            <QuestionHeader>
              <QuestionNumber>Question {questionIndex + 1}</QuestionNumber>
              <DangerButton 
                type="button" 
                onClick={() => removeQuestion(questionIndex)}
              >
                Remove Question
              </DangerButton>
            </QuestionHeader>
            
            <FormGroup>
              <Label htmlFor={`question-${questionIndex}`}>Question Text</Label>
              <Input
                type="text"
                id={`question-${questionIndex}`}
                value={question.questionText}
                onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                placeholder="Enter your question here"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Answer Choices</Label>
              {question.choices.map((choice, choiceIndex) => (
                <ChoiceContainer key={choiceIndex} $isCorrect={choice.isCorrect}>
                  <ChoiceInput>
                    <input
                      type="radio"
                      name={`correct-choice-${questionIndex}`}
                      checked={choice.isCorrect}
                      onChange={() => setCorrectChoice(questionIndex, choiceIndex)}
                    />
                    <Input
                      type="text"
                      value={choice.text}
                      onChange={(e) => handleChoiceTextChange(questionIndex, choiceIndex, e.target.value)}
                      placeholder={`Choice ${choiceIndex + 1}`}
                      required
                    />
                  </ChoiceInput>
                  {question.choices.length > 2 && (
                    <DangerButton 
                      type="button" 
                      onClick={() => removeChoice(questionIndex, choiceIndex)}
                    >
                      Remove
                    </DangerButton>
                  )}
                </ChoiceContainer>
              ))}
              <SmallButton 
                type="button" 
                onClick={() => addChoice(questionIndex)}
              >
                Add Choice
              </SmallButton>
            </FormGroup>
          </QuestionContainer>
        ))
      )}
      
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
    </QuizContainer>
  );
};

export default QuizBuilder;