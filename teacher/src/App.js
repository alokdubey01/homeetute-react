import './App.css';
import React from 'react'
import { AuthProvider } from './HOC/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import UpdateProfile from './pages/Update';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={< Profile />} />
            <Route path="/update" element={< UpdateProfile />} />
          </Route>
          <Route path='*' element={<div>page not found</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
