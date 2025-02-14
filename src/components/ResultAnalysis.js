import React, { useState, useEffect } from 'react';

function ResultAnalysis() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        { testName: "java-test-1", studentName: "Bob Smith", marksObtained: 59.0 },
        { testName: "java-test-1", studentName: "Frank Wilson", marksObtained: 57.0 },
        { testName: "mysql-test-1", studentName: "Isla Carter", marksObtained: 55.0 },
        { testName: "c++-test-1", studentName: "Ella Scott", marksObtained: 53.0 },
      ];
      setData(response);
    };

    fetchData();
  }, []);

  // Group data by testName
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.testName]) {
      acc[item.testName] = [];
    }
    acc[item.testName].push(item);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {Object.keys(groupedData).map((testName) => (
        <div key={testName} style={{ marginBottom: '40px' }}>
          <h2>{testName}</h2>
          <table
            border="1"
            style={{
              width: '70%',
              margin: '0 auto',
              borderCollapse: 'collapse',
              marginTop: '10px',
            }}
          >
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[testName].map((item, index) => (
                <tr key={index}>
                  <td>{item.studentName}</td>
                  <td>{item.marksObtained}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ResultAnalysis;
