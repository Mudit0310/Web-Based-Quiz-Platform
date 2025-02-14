import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Leaderboard.css";

const users = [
    {
        "studentName": "Frank Wilson",
        "averageMarks": 51.3333
    },
    {
        "studentName": "David White",
        "averageMarks": 51.1333
    },
    {
        "studentName": "Henry Baker",
        "averageMarks": 50.9333
    },
    {
        "studentName": "Ella Scott",
        "averageMarks": 50.8667
    },
    {
        "studentName": "Isla Carter",
        "averageMarks": 50.7333
    },
    {
        "studentName": "Grace Hall",
        "averageMarks": 50.4
    },
    {
        "studentName": "Alice Johnson",
        "averageMarks": 50.3333
    },
    {
        "studentName": "Bob Smith",
        "averageMarks": 50.3333
    },
    {
        "studentName": "Charlie Brown",
        "averageMarks": 50.2
    },
    {
        "studentName": "Jack Martin",
        "averageMarks": 50.0667
    }
];

function Leaderboard() {
    
    const navigate = useNavigate();

    const BackToDashBoard = () => {
        navigate("/");
    }

    const first = users[0];
    const second = users[1];
    const third = users[2];
    const rest = users.slice(3, 10);

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>

            <div className="podium">
                <div className="second-place">
                    <h3>{second.studentName}</h3>
                    <p>{second.averageMarks}</p>
                </div>
                <div className="first-place">
                    <h3>{first.studentName}</h3>
                    <p>{first.averageMarks}</p>
                </div>
                <div className="third-place">
                    <h3>{third.studentName}</h3>
                    <p>{third.averageMarks}</p>
                </div>
            </div>

            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student Name</th>
                        <th>Average Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {rest.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 4}</td>
                            <td>{user.studentName}</td>
                            <td>{user.averageMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => BackToDashBoard()}>Back to Dashboard</button>
        </div>
    );
}

export default Leaderboard;
