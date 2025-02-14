import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewProgress = () => {
  const backendData = {
    "java-test-2": [59.0],
    "java-test-3": [42.0],
    "java-test-1": [50.0],
    "cpp-test-3": [55.0],
    "cpp-test-1": [47.0],
    "cpp-test-2": [50.0],
    "mysql-test-1": [55.0],
    "mysql-test-3": [53.0],
    "mysql-test-2": [46.0],
  };

  // Organize data by subject
  const subjects = ["java", "cpp", "mysql"];
  const testsPerSubject = 3; // Each subject has 3 tests (test-1, test-2, test-3)
  
  const chartData = () => {
    const labels = subjects; // Subject names on the x-axis
    const datasets = [];

    // Define colors for each test
    const testColors = [
      "rgba(255, 99, 132, 0.8)",  // Test 1 - Red
      "rgba(54, 162, 235, 0.8)",  // Test 2 - Blue
      "rgba(75, 192, 192, 0.8)",  // Test 3 - Green
    ];

    // Create a dataset for each test (test-1, test-2, test-3)
    for (let i = 1; i <= testsPerSubject; i++) {
      const testData = subjects.map(
        (subject) => backendData[`${subject}-test-${i}`]?.[0] || 0 // Get score or 0 if not available
      );

      datasets.push({
        label: `Test ${i}`,
        data: testData,
        backgroundColor: testColors[i - 1],
      });
    }

    return {
      labels: labels,  // Subject names on the x-axis
      datasets: datasets,
    };
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Test Progress by Subject",
      },
    },
  };

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>Test Progress by Subject</h2>
      <Bar options={options} data={chartData()} />
    </div>
  );
};

export default ViewProgress;


// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ViewProgress = () => {
//   const [progressData, setProgressData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/view-progress"); // API endpoint
//         setProgressData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//         console.error("Error fetching progress data:", err);
//       }
//     };

//     fetchProgressData();
//   }, []);

//   const chartData = () => {
//     const labels = Object.keys(progressData); // Extracting test names dynamically from the backend response
//     const datasets = [];

//     const testColors = [
//       "rgba(255, 99, 132, 0.8)", // Red
//       "rgba(54, 162, 235, 0.8)", // Blue
//       "rgba(255, 206, 86, 0.8)", // Yellow
//       "rgba(75, 192, 192, 0.8)", // Green
//       "rgba(153, 102, 255, 0.8)", // Purple
//     ];

//     labels.forEach((testName, index) => {
//       datasets.push({
//         label: testName,
//         data: progressData[testName], // Scores for each test
//         backgroundColor: testColors[index % testColors.length], // Use colors cyclically
//       });
//     });

//     return {
//       labels: labels,
//       datasets: datasets,
//     };
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Test Progress by Subject",
//       },
//     },
//   };

//   if (loading) {
//     return <div>Loading progress data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div style={{ width: "800px", margin: "0 auto" }}>
//       <h2>Test Progress by Subject</h2>
//       <Bar options={options} data={chartData()} />
//     </div>
//   );
// };

// export default ViewProgress;
