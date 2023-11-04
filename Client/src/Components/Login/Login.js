import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from "./Login.navbar";
import classes from "./Login.module.css";
import bg from "../../assets/background-img2.jpg";

function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check the email and password entered by the user
    if (email === 'user@gmail.com' && password === 'userpassword') {
      // Navigate to the Meal page for the user
      navigate('/meal');
    } else if (email === 'admin@gmail.com' && password === 'adminpassword') {
      // Navigate to the Analytics page for the admin
      navigate('/analytics');
    } else {
      // Handle incorrect login here (e.g., show an error message)
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={classes.mainlogin}>
      <Navbar />
      <div className={classes.bgcover} style={{ backgroundImage: `url(${bg})` }}>
        <div className={classes.loginContainer}>
          <div className={classes.loginBox}>
            <h2>Login</h2>
            <form>
              <div className={classes.formGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={classes.checkbox}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">Accept all terms and conditions</label>
              </div>
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
