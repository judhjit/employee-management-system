// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./MultiDateCalendar.css";
// import { styled, Box, Button, Grid, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import CurrentBookings from "./CurrentBookings";
// import MultiDateCalendar from "./MultiDateCalendar";

// function LandingPage({selectedDates, setSelectedDates, user, setUser}) {
//     return (
//     <Grid container>
     
//       <Grid item xs={12} sm={9} style={{ backgroundColor: "lightblue", height: "100vh" }}>
//         <Grid container direction={"column"} style={{ height: '100%' }}>
//           <Grid item style={{ height: '8%', backgroundColor: '#003A64' }}>
//             <Typography variant="h5" component="div" style={{ padding: '20px' }}>
//               left Grid Content 1
//             </Typography>
//           </Grid>
//           <Grid item style={{ height: '50%', backgroundColor: 'white' }}>
            
//             <MultiDateCalendar
//     selectedDates={selectedDates}
//     setSelectedDates={setSelectedDates}
//     user={user}
//     setUser={setUser}/>
            
//           </Grid>
//           <Grid item style={{ height: '42%', backgroundColor: 'DEF3FF', padding:'10px'}}>
//             <CurrentBookings/>
//           </Grid>
//         </Grid>
//       </Grid>

      
//       <Grid item xs={12} sm={3} style={{ backgroundColor: '#004B81', height: "100vh" }}>
//         <Typography variant="h5" component="div" style={{ padding: '20px' }}>
//           Right Grid Content
//         </Typography>
//       </Grid>
//     </Grid>
//   );
// }

// export default LandingPage;


import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import MultiDateCalendar from './MultiDateCalendar';
import CurrentBookings from './CurrentBookings';
import './LandingPage.css';


function LandingPage({ selectedDates, setSelectedDates, user, setUser }) {
  return (
    <Grid container>
      {/* Left Grid */}
      <Grid item xs={12} sm={9} style={{ backgroundColor: 'lightblue', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Grid item style={{ flex: 0,height: '8%', backgroundColor: '#003A64' }}>
        <marquee behavior="scroll" direction="left" height="50px"style={{ color: 'white', fontSize:'20px'}}>
             <p className='text-update'>As the world's leading derivatives marketplace, CME Group enables clients to trade futures, options, cash and OTC markets, optimize portfolios, and analyze data – empowering market participants worldwide to efficiently manage risk and capture opportunities. </p>
        </marquee>
        
        
        </Grid>
        <Grid item style={{ flex: 0,height: '56%', backgroundColor: 'white', padding: '10px' }}>
          
          <MultiDateCalendar
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            user={user}
            setUser={setUser}
          />
         
         
        </Grid>
        <Grid item style={{ flex: 0,height: '35%', backgroundColor: 'DEF3FF', padding: '20px' }}>
          <CurrentBookings />
        </Grid>
      </Grid>

      {/* Right Grid */}
      <Grid item xs={12} sm={3} style={{ backgroundColor: '#004B81', height: '100vh' }}>
        <Typography variant="h5" component="div" style={{ padding: '20px', color: 'white' }}>
          Right Grid Content
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LandingPage;



