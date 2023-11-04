import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Meal from './Components/User/Meal/Meal';
import Login from './Components/Login/Login';
import Analytics from './Components/Admin/Analytics/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
