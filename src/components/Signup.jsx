
import React, { useState } from 'react';
import './Signup.css'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth1 } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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
      // Firebase account creation logic
      const userCredential = await createUserWithEmailAndPassword(
        auth1,
        formData.email, // Assuming you have an email field in your form data
        formData.password
      );

      // User successfully created
      const user = userCredential.user;
      console.log('User created:', user);

      // Reset form after submission if needed
      navigation('/home')
      setFormData({ email: '', password: '' });

    } catch (error) {
      // Handle account creation error
      console.error('Account creation error:', error.message);
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
            Already have an account? <a href="/">Login</a>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
