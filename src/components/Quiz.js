import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CelebrationModal from "./CelebrationModal";
import axios from "axios";
import "./Quiz.css";

const totalDuration = 1 * 60; // Total quiz time in seconds (1 minute)

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();
  const { testName } = useParams();

  // Fetch questions from backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tests/${testName}`);
        setQuestions(response.data);
        setSelectedOptions(new Array(response.data.length).fill(null)); // Initialize selectedOptions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [testName]);

  const handleOptionChange = (event) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[number] = event.target.value;
    setSelectedOptions(updatedOptions);
  };

  const nextQuestion = () => {
    if (number < questions.length - 1) {
      setNumber(number + 1);
    }
  };

  const previousQuestion = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      const selectedAnswer = selectedOptions[index]; // User's selected answer
      const correctAnswer = question.correctOption;

      // Ensure selectedAnswer is not undefined and correctly matches the correct answer
      if (selectedAnswer !== undefined && selectedAnswer === correctAnswer) {
        calculatedScore += 1; // Increase score for correct answers
      }
    });

    setScore(calculatedScore);
    setShowModal(true);
  }, [selectedOptions, questions]);

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsTimeUp(true);
      if (!showModal) {
        handleSubmit();
      }
    }
  }, [timeLeft, showModal, handleSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <p>Question {number + 1}</p>
      <h2>{questions[number].question}</h2>
      <div>
        <label>
          <input
            type="radio"
            value={questions[number].option1}
            checked={selectedOptions[number] === questions[number].option1}
            onChange={handleOptionChange}
            disabled={isTimeUp}
          />
          A. {questions[number].option1}
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value={questions[number].option2}
            checked={selectedOptions[number] === questions[number].option2}
            onChange={handleOptionChange}
            disabled={isTimeUp}
          />
          B. {questions[number].option2}
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value={questions[number].option3}
            checked={selectedOptions[number] === questions[number].option3}
            onChange={handleOptionChange}
            disabled={isTimeUp}
          />
          C. {questions[number].option3}
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value={questions[number].option4}
            checked={selectedOptions[number] === questions[number].option4}
            onChange={handleOptionChange}
            disabled={isTimeUp}
          />
          D. {questions[number].option4}
        </label>
      </div>
      <button className="quiz-btn" onClick={previousQuestion} disabled={number === 0 || isTimeUp}>
        Previous
      </button>
      <button className="quiz-btn" onClick={nextQuestion} disabled={number === questions.length - 1 || isTimeUp}>
        Next
      </button>
      <button className="quiz-btn" onClick={handleSubmit} disabled={isTimeUp}>
        Submit
      </button>

      {showModal && <CelebrationModal score={score} totalQuestions={questions.length} onClose={closeModal} />}
    </div>
  );
};

export default Quiz;
