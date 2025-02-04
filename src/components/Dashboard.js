import React from 'react';
import './Dashboard.css'; // Assuming a CSS file for styling
import { useNavigate } from 'react-router-dom';

const tests = [
  {id: 1, name: 'Java', duration : '30 mins', marks: '50 marks'},
  {id: 2, name: 'C++', duration : '45 mins', marks: '75 marks'},
  {id: 3, name: '.NET', duration : '45 mins', marks: '75 marks'},
  {id: 4, name: 'SQL', duration : '45 mins', marks: '75 marks'},
  {id: 5, name: 'Spring Boot', duration : '60 mins', marks: '100 marks'},
  {id: 6, name: 'Python', duration : '30 mins', marks: '50 marks'},
  {id: 7, name: 'Power BI', duration : '50 mins', marks: '80 marks'},
  {id: 8, name: 'JavaScript', duration : '45 mins', marks: '75 marks'},
  {id: 9, name: 'React JS', duration : '60 mins', marks: '100 marks'},
  {id: 10, name: 'Node JS', duration : '30 mins', marks: '50 marks'},
];

function Dashboard() {
  const navigate = useNavigate();

  const handleLeaderboardClick = () =>{
    navigate("/leaderboard");
  }

  const handleResultAnalysisClick = () => {
    navigate("/result-analysis");
  }

  const handleViewProgressClick = () => {
    navigate("/view-progress");
  }

  const handleStartTest = () => {
    navigate("/instructions");
  };

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <h3 className = "left-panel-box" onClick = {handleLeaderboardClick}>Leaderboard</h3>
        <h3 className = "left-panel-box" onClick = {handleResultAnalysisClick}>Result Analysis</h3>
        <h3 className = "left-panel-box" onClick = {handleViewProgressClick}>View Progress</h3>
      </div>

      <div className="right-panel">
        <div className="grid-container">
          {Array.from({length: Math.ceil(tests.length/3)}, (_, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {tests.slice(rowIndex * 3, rowIndex * 3 + 3).map((test) => (
                <div className="grid-col-3" key={test.id} onClick={() => handleStartTest()}>
                  <h2>{test.name}</h2>
                  <div className="test-details-container">
                    <p className="test-details">Duration: {test.duration}</p>
                    <p className="test-details">Total: {test.marks}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
