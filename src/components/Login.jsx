// Login.jsx

import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth1 } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firebase login logic
      const userCredential = await signInWithEmailAndPassword(
        auth1,
        formData.email,
        formData.password
      );


      const user = userCredential.user;
      console.log('User logged in:', user);
      navigation('/home');

     
      setFormData({ email: '', password: '' });
    } catch (error) {
      alert('Invalid Credentials')
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='account'>
            No Account? Create one <a href="/signup">here</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
