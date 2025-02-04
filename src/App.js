import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Instructions from './components/Instructions';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <div className = "Header">
          <Header></Header>
        </div> 

        <div className = "Dashboard">
          <Routes>
            <Route path = "/" element = {<Dashboard />}></Route>
            <Route path = "/instructions" element = {<Instructions />}></Route>
            <Route path = "/leaderboard" element = {<Leaderboard />}></Route>
          </Routes>
        </div>

        <div className = "Footer">
          <Footer></Footer>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
