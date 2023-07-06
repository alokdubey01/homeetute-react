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
import User from "./pages/User";
import UpdateProfile from "./pages/Update";
import Help from "./pages/Help";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/student/application" element={<Application />} />
            <Route path="/user" element={< User />} />
            <Route path="/chat" element={< Chat />} />
            <Route path="/profile" element={< UpdateProfile />} />
            {/* <Route path="/student/post/edit" element={< Editpost />} /> */}
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher/:id" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/add" element={< Editpost />} />
          {/* <Route path="/teacher/:uid" element={<Profile />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
