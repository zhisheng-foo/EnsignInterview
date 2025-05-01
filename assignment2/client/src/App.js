import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login/login';
import Signup from './SignUp/signup'; 
import ViewAllProducts from './ViewAllProducts/viewAllProducts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ViewAllProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
