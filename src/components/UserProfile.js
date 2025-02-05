import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../middleware/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import Logo from '../images/logo.png'; 
import Google from '../images/Google.png';

const UserProfile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // Initialize Google Auth Provider

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        navigate('/welcome');
      } else {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        // Register user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
        navigate('/welcome');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      navigate('/welcome'); // Redirect after successful Google Sign-In
    } catch (error) {
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="container">
      {/* Add the logo here */}
      <div style={{ textAlign: 'center' }}>
        <img src={Logo} alt="ToDo App Logo" style={{ width: '200px', marginBottom: '20px' }} />
      </div>
      <h1>{isLogin ? 'Sign In' : 'Create Profile'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="buttons">
          <button type="submit" className="save-btn">
            {isLogin ? 'Sign In' : 'Create Profile'}
          </button>
        </div>
      </form>
      <button onClick={handleSwitch} className="clear-btn">
        {isLogin ? 'Create a new profile' : 'Already have an account? Sign In'}
      </button>
      <hr />
      <button
        onClick={handleGoogleSignIn}
        className="google-btn"
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ccc',
          padding: '10px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
      >
        <img
          src={Google}
          alt="Google Logo"
          style={{ width: '20px', marginRight: '10px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default UserProfile;
