import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
// import Login from './Login'

import api from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      case 'firstName':
      case 'lastName':
      case 'userId':
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: 'This field is required',
          }));
        }
        break;

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

      case 'confirmPassword':
        if (value !== formData.password) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: 'Passwords do not match',
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
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
    
    try{
      const response = await api.post('/signup', formData);
      // console.log(response.data.message, response.data.userId, response.data.firstName);
      // Navigate to login page on successful signup
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <Grid container style={{justifyContent:'center'}}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <TextField
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.userId}
              helperText={errors.userId}
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Sign Up
            </Button>
          </form>
          <p>Already have an Account?</p>
          <Link to="/login">Login</Link>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
