import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Leaderboard.css";

const user = [
    {id : 1, name : "Manoj Pentapalli", marks : 95},
    {id : 2, name : "Mudit Kumar", marks : 92},
    {id : 3, name : "Gagan Malligwad", marks : 89},
    {id : 4, name : "Sudhanshu Patel", marks : 83},
    {id : 5, name : "Utkarsh Tyagi", marks : 82},
    {id : 6, name : "Vashu Chaudhary", marks : 80},
];

function Leaderboard() {
    
    const navigate = useNavigate();

    const BackToDashBoard = () => {
        navigate("/");
    }
    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student Name</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, id) => (
                        <tr key={user.id}>
                            <td>{id + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.marks}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
        <button onClick = {() => BackToDashBoard()}>Back to Dashboard</button>
    </div>
  )
}

export default Leaderboard
