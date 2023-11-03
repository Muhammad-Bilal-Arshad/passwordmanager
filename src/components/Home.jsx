// Home.jsx

import React, { useState, useEffect } from 'react';
import './Home.css';
import { signOut } from 'firebase/auth';
import { auth1, firestore1 } from '../firebaseconfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Home = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');

  const userId = auth1.currentUser ? auth1.currentUser.uid : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const passwordsCollection = collection(firestore1, 'passwords');
          const passwordsSnapshot = await getDocs(passwordsCollection);
          const passwordsData = passwordsSnapshot.docs
            .filter(doc => doc.data().userId === userId)
            .map(doc => doc.data());
          setPasswords(passwordsData);
        }
      } catch (error) {
        console.error('Error fetching passwords from Firestore:', error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddPassword = async () => {
    try {
      setPasswords((prevPasswords) => [...prevPasswords, { name: newName, password: newPassword, userId }]);
      setNewPassword('');
      setNewName('');

      if (userId) {
        const passwordsCollection = collection(firestore1, 'passwords');
        await addDoc(passwordsCollection, { name: newName, password: newPassword, userId });
      }
    } catch (error) {
      console.error('Error adding password to Firestore:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth1);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className='Home'>
      <div className="home-container">
        <h2>Password Manager</h2>

        <div className="add-password-section">
          <h3>Add Password</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="button" onClick={handleAddPassword}>
              Add Password
            </button>
          </div>
        </div>

        <div className="view-passwords-section">
          <h3>View Passwords</h3>
          {passwords.map((entry, index) => (
            <div key={index} className="password-card">
              <strong>{entry.name}:</strong> {entry.password}
            </div>
          ))}
        </div>

        <div className="logout-section">
          <button type="button" className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
