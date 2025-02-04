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

  // initialize the navigate function
  const navigate = useNavigate(); 

  const handleStartTest = () => {
    navigate("/instructions");
  };

  return (
    <div className="grid-container">
      {/* it will create an array of 3 size, as we want to have 3 tests in one row */}
      {Array.from({length : Math.ceil(tests.length/3)}, (_, rowIndex) => (
        // this will be for each row
        <div className = "grid-row" key = {rowIndex}>
          {/* it will select the test which needs to be displayed from tests object */}
          {tests.slice(rowIndex * 3, rowIndex*3 + 3).map((test)=>(
            // this will be for each grid
            <div className = "grid-col-3" key = {test.id}>
              <h2>{test.name}</h2>
              <div className = "test-details-container">
                <p className = "test-details">Duration : {test.duration}</p>
                <p className = "test-details">Total : {test.marks}</p>
                <button className = "test-button" onClick={handleStartTest}>Start Test</button>
              </div>
            </div>
          ))}
          </div>
      ))}
  </div>
  );
}

export default Dashboard;
