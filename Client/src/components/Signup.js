// import React, { useState } from 'react';
// import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     userId: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     userId: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'firstName':
//       case 'lastName':
//       case 'userId':
//         if (!value.trim()) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: 'This field is required',
//           }));
//         }
//         break;

//       case 'email':
//         const emailRegex = /^[^\s@]+@abcgroup\.com$/;
//         if (!emailRegex.test(value)) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: 'Invalid email address',
//           }));
//         }
//         break;

//       case 'password':
//         if (value.length < 6) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: 'Password must be at least 6 characters',
//           }));
//         }
//         break;

//       case 'confirmPassword':
//         if (value !== formData.password) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: 'Passwords do not match',
//           }));
//         }
//         break;

//       default:
//         break;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // final validation
//     let isValid = true;
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key].trim()) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [key]: 'This field is required',
//         }));
//         isValid = false;
//       }
//     });

//     if (!isValid) {
//       return;
//     }
//     console.log('Signup successful:', formData);
//     navigate('/login');
//   };

//   return (
//     <Grid container style={{justifyContent:'center'}}>
//       <Grid item xs={10} sm={8} md={6} lg={4}>
//         <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Sign Up
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.firstName}
//               helperText={errors.firstName}
//             />

//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.lastName}
//               helperText={errors.lastName}
//             />

//             <TextField
//               label="User ID"
//               name="userId"
//               value={formData.userId}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.userId}
//               helperText={errors.userId}
//             />

//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.email}
//               helperText={errors.email}
//             />

//             <TextField
//               label="Password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.password}
//               helperText={errors.password}
//             />

//             <TextField
//               label="Confirm Password"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               fullWidth
//               required
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               style={{ marginTop: '20px' }}
//             >
//               Sign Up
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignUp;

// SignUp.js
import React, { useState } from 'react';

import { TextField, Button, Grid, Paper, Typography } from '@mui/material/';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './Layout.css';



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
            [name]: '',
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
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      return; // Stop form submission
    }

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

    try {
      const response = await api.post('/signup', formData);
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ justifyContent: 'center' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
          InputLabelProps={{
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName}
          InputLabelProps={{
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginBottom: '10px' }}
        />

        <TextField
          label="User ID"
          name="userId"
          variant="outlined"
          value={formData.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={!!errors.userId}
          helperText={errors.userId}
          InputLabelProps={{
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginBottom: '10px' }}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email}
          InputLabelProps={{
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginBottom: '10px' }}
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
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginBottom: '10px' }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputLabelProps={{
            style: { color: '#07345f', fontSize: '11px' }
          }}
          style={{ marginBottom: '10px' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Sign Up
        </Button>
      </form>

      <p>Already have an account?<Link to="/" style={{ fontStyle: 'italic' }}>Login</Link></p>

    </div>
  );
};

export default Signup;
