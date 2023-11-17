

import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, Link} from 'react-router-dom';
import './Layout.css'

const Login = ({showNewsFeed,setShowNewsFeed}) => {
  const navigate = useNavigate();
  setShowNewsFeed(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Perform validation
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@abcgroup\.com$/;
        if (!emailRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: 'Invalid email address',
          }));
        }
        break;

      case 'password':
        if (value.length < 6) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: 'Password must be at least 6 characters',
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform final validation
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: 'This field is required',
        }));
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    console.log('Login successful:', formData);
    setShowNewsFeed(true);
    // Show alert on successful login
    // alert('Login successful');
    navigate('/landingpage')
  };

  return (
    <div style={{justifyContent:'center'}}>
      {/* <Grid item xs={10} sm={8} md={6} lg={4}> */}
        <div className="forms-layout" >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{marginLeft:'29px'}}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{
                style: { color: '#07345f', fontSize:'11px'} 
              }}
              style={{ marginTop:'50px',marginBottom: '27px' }} 
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{
                style: { color: '#07345f', fontSize:'11px'} 
              }}
              style={{ marginBottom: '40px' }} 
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
          <p>Not Registered?<Link to="/signup" style={{fontStyle:'italic'}}>Signup</Link></p>
          
        </div>
      {/* </Grid> */}
    </div>
  );
};

export default Login;

