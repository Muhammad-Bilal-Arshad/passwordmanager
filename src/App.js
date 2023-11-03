import React, { useState, useEffect } from 'react';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth1 } from './firebaseconfig';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth1, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={<ProtectedRoute element={<Home />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
