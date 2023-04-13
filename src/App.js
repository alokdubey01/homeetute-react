import React from 'react';
import { AuthProvider } from './HOC/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/teacher/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import PrivateRoute from './PrivateRoute';
import Register from './pages/Register';
import Error from './pages/Error';
import Dashboard from './pages/student/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/student/home" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error/>} />
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
