import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login/login';
import Signup from './SignUp/signup'; 
import ViewAllProducts from './ViewAllProducts/viewAllProducts';
import ViewSelectedProduct from './ViewSelectedProduct/viewSelectedProduct';
import ShoppingCart from './ShoppingCart/shoppingcart';
import ProtectedRoute from './Components/protectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ViewAllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ViewSelectedProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
