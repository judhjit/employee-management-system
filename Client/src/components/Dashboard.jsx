// import React from 'react'
// import Sidebar from './Sidebar'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions, Divider } from '@mui/material';

// const Dashboard = () => {
//   return (
//     <div>
//     <div style={{display:'flex' ,flexDirection:'row'}}>
//     <Sidebar/>
//     <Card
//         sx={{
          
//             marginLeft: '20px',
//                       position:'absolute',
//                       marginTop: '32px',
//                       width: '300px',
//                       height: '150px',
//           borderRadius: "15px",
//           border:' 9 solid grey',
//         //   backgroundColor: "#F1F1F1 !important",
//           marginLeft: "110px",
//           boxShadow:10,
//         }}
//         variant="outlined"
//       >
//         <CardContent>
//           <Typography
            
//           >
//             <span style={{ color: "#0071BA" }}>Book </span>
//             <span>Your Lunch!</span>
//           </Typography>

//           <Divider
//             style={{ width: "285px", height: "0px", opacity: 0.3 }}
//           />

//           <div>
//             <p
              
//             >
//               Preference:
//             </p>
//           </div>
//         </CardContent>
//         <CardActions>
          
//         </CardActions>
//       </Card>

//     </div>
//     </div>
//   )
// }

// export default Dashboard


import React from 'react';
import Sidebar from './Sidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import Illustration from '../assets/Illustration.png';
import Lunch from '../assets/lunch.png';
import CurrentBookings from './CurrentBookings';
const Dashboard = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />

        <Box
        sx={{
          boxShadow: '0 4px 8px 0 rgba(149,146,146,0.2), 0 4px 20px 0 rgba(255, 255, 255, 0.19);',
          marginLeft: '441px',
          position: 'absolute',
          marginTop: '32px',
          width: '497px',
          height: '92vh',
          borderRadius: "15px",
          backgroundColor:'white'
        //   bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        //   color: (theme) =>
        //     theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        //   p: 1,
        //   m: 1,
        //   borderRadius: 2,
          
        }}
      >
        <img src={Lunch} style={{width:'435px',marginTop:'20px',height:'100px',display:'flex' , margin:'16px auto'}}/>

        <Typography style={{marginTop:'2vw', marginLeft:'30px',fontFamily:'poppins',fontSize:'18px', fontWeight:'bold'}}>Current Booking</Typography>
        <Divider
            style={{ width: "427px", height: "15px", opacity: 0.5, marginLeft:'30px' }}
          />
          <CurrentBookings/>
      </Box>

        <Box
        sx={{
          boxShadow: '0 4px 8px 0 rgba(149,146,146,0.2), 0 4px 20px 0 rgba(255, 255, 255, 0.19);',
          marginLeft: '960px',
          position: 'absolute',
          marginTop: '32px',
          width: '497px',
          height: '92vh',
          borderRadius: "15px",
          backgroundColor:'white'
        //   bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        //   color: (theme) =>
        //     theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        //   p: 1,
        //   m: 1,
        //   borderRadius: 2,
          
        }}
      >
       <img src={Illustration} style={{marginTop:'368px'}}/>
      </Box>
      </div>
    </div>
  );
};

export default Dashboard;
