// import React from 'react'
// import {Box,Button} from '@mui/material';
// import TextField from '@mui/material/TextField';
// const GrantAccess = () => {
//   return (
//     <div>
//       <h2 style={{ paddingLeft:'64px',paddingTop:'30px'}}>
//           <span style={{color: '#0071BA' }}>Grant </span>
//           <span>Access:</span>
//         </h2>
//       <div style={{ display: 'flex', gap: '20px' ,paddingTop:'4vw',paddingLeft:'5vw'}}>
        
//      <Box
//       component="form"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column', // Stack items vertically
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >

//       <h>Enter Employee id:</h>
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" /> 
//     </Box>
//     <Box component="form"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column', // Stack items vertically
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}>
//     <h>Enter Employee Name:</h>
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       </Box>

//       </div>
//       <Button variant="contained" style={{left:'59px'}}>Allow</Button>
//     </div>
    
    
//   )
// }

// export default GrantAccess

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GrantAccess = () => {
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  const handleAllow = () => {
    if (employeeId && employeeName) {
      const newData = [
        ...data,
        { slno: data.length + 1, employeeId, employeeName, permission: 'News Feed Admin' },
      ];
      setData(newData);
      setEmployeeId('');
      setEmployeeName('');
    }
  };

  return (
    <div>
      <div>
      <h2 style={{ paddingLeft: '64px', paddingTop: '30px' }}>
        <span style={{ color: '#0071BA' }}>Grant </span>
        <span>Access:</span>
      </h2>
      <div style={{ display: 'flex', gap: '20px', paddingTop: '4vw', paddingLeft: '5vw' }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <h>Enter Employee ID:</h>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </Box>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <h>Enter Employee Name:</h>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </Box>
        
      </div>
      <Button variant="contained" style={{ left: '80px' }} onClick={handleAllow}>
          Allow
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '20px' ,marginLeft:'80px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Slno</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.slno}>
                <TableCell>{row.slno}</TableCell>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.employeeName}</TableCell>
                <TableCell>{row.permission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GrantAccess;
