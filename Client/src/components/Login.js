import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
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
    alert('Login successful');
  };

  return (
    <Grid container style={{justifyContent:'center'}}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
