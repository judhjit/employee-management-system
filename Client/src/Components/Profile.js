import React from 'react';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';

const Profile = () => {
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    employeeId: 'EMP123',
    userType: 'Employee',
  };

  const itemBoxStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
  };

  const valueStyle = {
    fontSize: '16px',
  };

  return (
    <div className="profile-container" style={{ marginLeft: '270px', marginTop: '70px' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            alt="Profile Avatar"
            sx={{ width: 100, height: 100, backgroundColor: 'primary.main' }}
          >
            {userData.firstName.charAt(0).toUpperCase()}
            {userData.lastName.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            My Profile
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '20px 0' }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={itemBoxStyle}>
            <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
              First Name:
            </Typography>
            <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
              {userData.firstName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={itemBoxStyle}>
            <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
              Last Name:
            </Typography>
            <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
              {userData.lastName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={itemBoxStyle}>
            <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
              Employee ID:
            </Typography>
            <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
              {userData.employeeId}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={itemBoxStyle}>
            <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
              User Type:
            </Typography>
            <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
              {userData.userType}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
