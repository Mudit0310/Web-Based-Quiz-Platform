import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/testdetails/getTestDetails');
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTests();
  }, []);

  const getLatestTest = (subject) => {
    const subjectTests = tests.filter(test => test.testName.startsWith(subject));
      if (subjectTests.length === 0) {
        return null; // Or handle the case where there are no tests for the subject
      }
      return subjectTests[subjectTests.length - 1]; // Returns the last element
    };

  const handleStartTest = (subject) => {
    const latestTest = getLatestTest(subject);

    if (!latestTest) {
      console.warn(`No tests found for subject: ${subject}`);
      return; // Prevent navigation if there's no test
    }

    navigate('/instructions', {
      state: {
        testName: subject,
        duration: latestTest.duration
      }
    });
  };

  // Extract unique subjects
  const uniqueSubjects = [...new Set(tests.map(test => test.testName.split('-')[0]))];

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <h3 className="left-panel-box" onClick={() => navigate('/leaderboard')}>Leaderboard</h3>
        <h3 className="left-panel-box" onClick={() => navigate('/result-analysis')}>Result Analysis</h3>
        <h3 className="left-panel-box" onClick={() => navigate('/view-progress')}>View Progress</h3>
      </div>

      <div className="right-panel">
        <div className="grid-container">
          {Array.from({ length: Math.ceil(uniqueSubjects.length / 3) }, (_, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {uniqueSubjects.slice(rowIndex * 3, rowIndex * 3 + 3).map((subject) => {
                const latestTest = getLatestTest(subject);

                if (!latestTest) {
                  return (
                    <div className="grid-col-3" key={subject}>
                      <h2>{subject}</h2>
                      <p>No tests available</p>
                    </div>
                  );
                }
                return (
                  <div className="grid-col-3" key={subject} onClick={() => handleStartTest(subject)}>
                    <h2>{subject}</h2>
                    <div className="test-details-container">
                      <p className="test-details">Duration: {latestTest.duration} mins</p>
                      <p className="test-details">Total: {latestTest.totalMarks} marks</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
