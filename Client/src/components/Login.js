// import React, { useState } from 'react';
// import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
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

//       default:
//         break;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
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
//     console.log('Login successful:', formData);
//     alert('Login successful');
//   };

//   return (
//     <Grid container style={{justifyContent:'center'}}>
//       <Grid item xs={10} sm={8} md={6} lg={4}>
//         <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Login
//           </Typography>
//           <form onSubmit={handleSubmit}>
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

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               style={{ marginTop: '20px' }}
//             >
//               Login
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { useNavigate, Link} from 'react-router-dom';
import './Layout.css'

import api from "../api";

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });


  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation
    let isValid = true;
    Object.keys(credentials).forEach((key) => {
      if (!credentials[key].trim()) {
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
      const response = await api.post('/login', credentials);
      // const { accessToken } = response.data;
      const {
        accessToken,
        userId,
        firstName,
        lastName,
        email,
        isAdmin,
        isNewsAdmin,
      } = response.data;
  
      setUser(() => ({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: isAdmin,
        isNewsAdmin: isNewsAdmin,
      }));
  
      localStorage.setItem('token', accessToken);
      console.log('Login successful:', userId, firstName);
      // alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      // alert('Login failed');
    }

  };

  return (
    <div style={{justifyContent:'center'}}>
      {/* <Grid item xs={10} sm={8} md={6} lg={4}> */}
        <div className="forms-layout">
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              variant="outlined"
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
              value={credentials.password}
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

