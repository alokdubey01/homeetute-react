import "./App.css"
import React from 'react';
import { AuthProvider } from './HOC/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import PrivateRoute from './PrivateRoute';
import Register from './pages/Register';
import Error from './pages/Error';
import Editpost from './pages/Editpost';
import Profile from './pages/Profile';
import Application from "./pages/Application";
import Chat from "./pages/Chat";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/student/application" element={<Application />} />
            <Route path="/chat" element={< Chat />} />
            {/* <Route path="/student/post/edit" element={< Editpost />} /> */}
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher/:id" element={<Profile />} />
            <Route path="/add" element={< Editpost />} />
          {/* <Route path="/teacher/:uid" element={<Profile />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
