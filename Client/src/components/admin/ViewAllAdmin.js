// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import { Label } from '@mui/icons-material';


// const ViewAllAdmin = () => {
//     const [employees, setEmployees] = useState([
//         { empID: '1234', name: 'ajeet'},
//     { empID: '1235', name: 'sumit' },
//     { empID: '1236', name: 'amit'},
//     { empID: '1237', name: 'abc'},
//     { empID: '1238', name: 'abc' },
//     { empID: '1239', name: 'abc'},
//     { empID: '1242', name: 'abc' },
      

//     ]);
//   console.log('viweAllAdmin');
//     const handleRemoveEmployee = (empID) => {
//       setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.empID !== empID));
//     };
  
//     return (
//       <div>
//         <h1 style={{marginLeft:'500px'}}>List of All The News Admins</h1>
//         <TableContainer component={Paper} style={{marginLeft:'350px'}}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Employee Name</TableCell>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {employees.map((employee) => (
//                 <TableRow key={employee.empID}>
//                   <TableCell>{employee.name}</TableCell>
//                   <TableCell>{employee.empID}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       startIcon={<DeleteIcon />}
//                       onClick={() => handleRemoveEmployee(employee.empID)}
//                     >
//                       Remove
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   };
  
//   export default ViewAllAdmin;



import React, { useState } from 'react';
import './GrantAccess.css';
import DoneIcon from '@mui/icons-material/Done';

import DeleteIcon from '@mui/icons-material/Delete';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ViewAllAdmin = () => {
  const navigate=useNavigate();
  const [employees, setEmployees] = useState([
            { empID: '1234', name: 'ajeet'},
        { empID: '1235', name: 'sumit' },
        { empID: '1236', name: 'amit'},
        { empID: '1237', name: 'abc'},
        { empID: '1238', name: 'abc' },
        { empID: '1239', name: 'abc'},
        { empID: '1242', name: 'abc' },
          
    
        ]);
      console.log('viweAllAdmin');
          const handleRemoveEmployee = (empID) => {
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.empID !== empID));
          };

      
        
  return (
    <div style={{
      backgroundColor: "white",
      height: "664px",
      width: "75vw",
      textAlign: "center",
      margin: "0 auto",
    }}> 
      
      <h1 style={{margin:'auto', marginLeft:'1vw'}}>Manage requests:-</h1>
      
      <TableContainer component={Paper} style={{
      width: "62vw",
      marginTop: "2vw",
      marginLeft: "5vw",
      maxHeight: 520,
      justifyContent: "center",
      border: "1px solid #E9E9E9",
      borderRadius: "10px",
     
    }}>
             <Table stickyHeader>
               <TableHead>
                 <TableRow>
                   <TableCell style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                    fontFamily:'poppins'
                  }}>Employee ID</TableCell>
                   <TableCell style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                    fontFamily:'poppins'
                  }}>Name</TableCell>
                   
                   <TableCell style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                    fontFamily:'poppins',
                    marginLeft:'20px'
                  }}>Actions</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody style={{ backgroundColor: "	#F5F5F5" }} >
                 {employees.map((employee) => (
              <TableRow key={employee.empID}>
                    <TableCell style={{ color: "#79C6F1", fontWeight: "bold", fontFamily:'poppins' ,paddingTop:'6px'}}>{employee.empID}</TableCell>
                    <TableCell style={{ color: "#0071BA", fontWeight: "bold" , fontFamily:'poppins'}}>{employee.name}</TableCell>
                    
                    <TableCell style={{maginLeft:'2px'}}>
                     <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveEmployee(employee.empID)}
                    >
                        Remove
                     </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></div>
  )
}

export default ViewAllAdmin
  