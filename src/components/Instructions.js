import React from 'react'
import './Instructions.css';
import { useNavigate } from 'react-router-dom';


function Instructions() {

    const navigate = useNavigate();
    const startQuiz = () => {
        navigate("/exam");
    };

  return (
    <div className = "test-instructions">
        <h2>Quiz Instructions</h2>
        <p>
        <strong> A. General information: </strong><br />    
            1. The examination will comprise of Objective type Multiple Choice Questions (MCQs)<br />
            2. All questions are compulsory and each carries One mark.<br />
            3. The total number of questions, duration of examination, will be different based on<br />
               the course, the detail is available on your screen.<br />
            4. The Subjects or topics covered in the exam will be as per the Syllabus.<br />
            5. There will be <strong>NO NEGATIVE MARKING</strong> for the wrong answers.<br />

        <strong> B. Information & Instructions:</strong><br />
            1. The examination does not require using any paper, pen, pencil and calculator.<br />
            2. Every student will take the examination on a Laptop/Desktop/Smart Phone<br />
            3. On computer screen every student will be given objective type type Multiple Choice Questions (MCQs).<br />
            4. Each student will get questions and answers in different order selected randomly from a fixed Question Databank.<br />
            5. The students just need to click on the Right Choice / Correct option from themultiple choices /options given with each question. For Multiple Choice Questions, each question has four options, and the candidate has to click the appropriate option.<br />

            <p className = "important-note">
                <strong>Important: </strong> Do not click the <strong>"End Test"</strong> button unless you want to leave early.
            </p>
        </p>

        <button className = "start-quiz-btn" onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}

export default Instructions