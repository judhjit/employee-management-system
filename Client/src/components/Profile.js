// import React from 'react';
// import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';


// const Profile = () => {
//   const userData = {
//     firstName: 'John',
//     lastName: 'Doe',
//     employeeId: 'EMP123',
//     emailId:'Johndoe@abcgroup.com'
//   };

//   const itemBoxStyle = {
//     border: '2px solid #004B81',
//     padding: '12px',
//     backgroundColor:'#FAF9F6',
//     height:'25px',
//     marginBottom: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     fontSize: '14px',
//   };

//   const valueStyle = {
//     fontSize: '14px',
//   };

//   return (
//     <div className="profile-container" style={{ marginLeft: '250px', marginTop: '50px'}}>
//       <Grid container justifyContent="center" alignItems="center" spacing={2}>
//         <Grid item>
//           <Avatar
//             alt="Profile Avatar"
//             sx={{ width: 75, height: 75, backgroundColor: 'primary.main' }}
//           >
//             {userData.firstName.charAt(0).toUpperCase()}
//             {userData.lastName.charAt(0).toUpperCase()}
//           </Avatar>
//         </Grid>
//         <Grid item>
//         <h style={{ fontSize: '35px', textAlign: 'left', fontWeight: '500'}}>
//             <span style={{ color: '#0071BA' }}>My </span>
//             <span>Profile</span>
//           </h>
//         </Grid>
//       </Grid>

//       <Divider sx={{ margin: '20px 0' }} />

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box sx={itemBoxStyle}>
//             <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
//               First Name:
//             </Typography>
//             <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
//               {userData.firstName}
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box sx={itemBoxStyle}>
//             <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
//               Last Name:
//             </Typography>
//             <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
//               {userData.lastName}
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box sx={itemBoxStyle}>
//             <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
//               Employee ID:
//             </Typography>
//             <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
//               {userData.employeeId}
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box sx={itemBoxStyle}>
//             <Typography variant="h6" sx={labelStyle} style={{ display: 'inline', marginRight: '10px' }}>
//               Email Id:
//             </Typography>
//             <Typography variant="body1" sx={valueStyle} style={{ display: 'inline' }}>
//               {userData.emailId}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import bg3 from '../assets/bgimg4.svg';
import './Profile.css'


const Profile = () => {
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    employeeId: 'EMP123',
    emailId: 'Johndoe@abcgroup.com',
  };

  const profileContainerStyle = {
    marginLeft: '50px',
    marginTop: '20px',
    overflow:'hidden',
    display: 'flex',
    flexDirection: 'row',
    height:'80vh',
    
  };

  const headerContainerStyle = {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    marginBottom: '20px',
   
   
   
  };

  const avatarStyle = {
    width: '75px',
    height: '75px',
    alignItems:'center',
    backgroundColor: 'primary.main',
    marginLeft:'195px',
    marginTop:'20px',
  };

  const headingStyle = {
    fontSize: '30px',
    textAlign: 'left',
    fontWeight: '500',
    marginLeft: '90px',
  };

  const dataContainerStyle = {
    display: 'flex',
    // alignItems:'center',
    flexDirection: 'column',
    marginLeft:'110px',
    
  };

  const itemBoxStyle = {
    border: '2px solid #004B81',
    padding: '12px',
    backgroundColor: '#FAF9F6',
    height: '25px',
    width:'500px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline',
    marginRight: '10px',
  };

  const valueStyle = {
    fontSize: '14px',
    display: 'inline',
  };
  

  return (
    <div className="profile-container" style={profileContainerStyle}>
      <div style={headerContainerStyle}>
        {/* <h style={headingStyle}>
          <span style={{ color: '#0071BA'}}>My </span>
          <span>Profile</span>
        </h> */}
        {/* <Avatar alt="Profile Avatar" sx={avatarStyle}>
          {userData.firstName.charAt(0).toUpperCase()}
          {userData.lastName.charAt(0).toUpperCase()}
        </Avatar> */}
        <img src={bg3} alt="Left Half" />
        
      </div>

      

      <div style={dataContainerStyle}>
        
        <h style={headingStyle}>
          <span style={{ color: '#0071BA' }}>Personal  </span>
          <span>Information</span>
        </h>
        <Avatar alt="Profile Avatar" sx={avatarStyle}>
          {userData.firstName.charAt(0).toUpperCase()}
          {userData.lastName.charAt(0).toUpperCase()}
        </Avatar>
        
        <Divider sx={{ margin: '20px 0' }} />
        <Box sx={itemBoxStyle}>
          <Typography variant="h6" sx={labelStyle}>
            First Name:
          </Typography>
          <Typography variant="body1" sx={valueStyle}>
            {userData.firstName}
          </Typography>
        </Box>

        <Box sx={itemBoxStyle}>
          <Typography variant="h6" sx={labelStyle}>
            Last Name:
          </Typography>
          <Typography variant="body1" sx={valueStyle}>
            {userData.lastName}
          </Typography>
        </Box>

        <Box sx={itemBoxStyle}>
          <Typography variant="h6" sx={labelStyle}>
            Employee ID:
          </Typography>
          <Typography variant="body1" sx={valueStyle}>
            {userData.employeeId}
          </Typography>
        </Box>

        <Box sx={itemBoxStyle}>
          <Typography variant="h6" sx={labelStyle}>
            Email Id:
          </Typography>
          <Typography variant="body1" sx={valueStyle}>
            {userData.emailId}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Profile;



