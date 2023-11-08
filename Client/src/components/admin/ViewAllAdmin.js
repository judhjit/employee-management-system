import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { Label } from '@mui/icons-material';


const ViewAllAdmin = () => {
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
      <div>
        <h1 style={{marginLeft:'500px'}}>List of All The News Admins</h1>
        <TableContainer component={Paper} style={{marginLeft:'350px'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.empID}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.empID}</TableCell>
                  <TableCell>
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
        </TableContainer>
      </div>
    );
  };
  
  export default ViewAllAdmin;
  