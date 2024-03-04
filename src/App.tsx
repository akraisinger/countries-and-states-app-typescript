import React from 'react';
import './App.css';
import CountriesAndStates from './components/CountriesAndStates';
import CreateCountries from './components/CreateCountries';
import CreateStates from './components/CreateStates';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  
  return (
    
    <div className="container">
      <nav>
        <ul>
          <li>
          <Link to="/" className="list">
            Home
          </Link>
          </li>
          <li>
          <Link to="/create-countries" className="list">
            Create Countries
          </Link>
          </li>
          <li>
          <Link to="/create-states" className="list">
            Create States
          </Link>
          </li>
        </ul>
      </nav>
      <div className="body">
      <Routes>
        <Route path="/" element={<CountriesAndStates />} />
        <Route path="/create-countries" element={<CreateCountries />} />
        <Route path="/create-states" element={<CreateStates />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
