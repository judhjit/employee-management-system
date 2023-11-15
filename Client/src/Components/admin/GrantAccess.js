import React, { useState } from 'react';
import './GrantAccess.css';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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


const GrantAccess = () => {
  const navigate=useNavigate();
  const [requests, setRequests] = useState([
        { empID: '1234', name: 'ajeet', status: 'Pending' },
        { empID: '1235', name: 'sumit', status: 'Pending' },
        { empID: '1236', name: 'amit', status: 'Pending' },
        { empID: '1237', name: 'abc', status: 'Pending' },
        { empID: '1238', name: 'abc', status: 'Pending' },
        { empID: '1239', name: 'abc', status: 'Pending' },
        { empID: '1242', name: 'abc', status: 'Pending' },
      ]);
    

      const handleAccept = (empID) => {
            const updatedRequests = requests.map((request) =>
              request.empID === empID ? { ...request, status: 'Accepted' } : request
            );
            setRequests(updatedRequests);
          };
        
          const handleReject = (empID) => {
            const updatedRequests = requests.map((request) =>
              request.empID === empID ? { ...request, status: 'Rejected' } : request
            );
            setRequests(updatedRequests);
          };
        
  return (
    <div  style={{
      backgroundColor: "white",
      height: "600px",
      width: "75vw",
      textAlign: "center",
      margin: "0 auto",
    }} > 
      
      <h1 style={{margin:'auto'}}>Grant News Access:-</h1>
      <Button style={{ fontSize: '0.8vw',marginLeft:'55vw' }} onClick={ ()=>navigate('/viewAllAdmin')}>View all news Admins</Button>
      <TableContainer component={Paper} style={{
      width: "68vw",
      marginTop: "0.1vw",
      marginLeft: "4vw",
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
                    fontFamily:'poppins'
                  }}>Status</TableCell>
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
                 {requests.map((request) => (
              <TableRow key={request.empID}>
                    <TableCell style={{ color: "#79C6F1", fontWeight: "bold", fontFamily:'poppins' ,paddingTop:'6px'}}>{request.empID}</TableCell>
                    <TableCell style={{ color: "#0071BA", fontWeight: "bold" , fontFamily:'poppins'}}>{request.name}</TableCell>
                    <TableCell style={{ fontFamily:'poppins'}}>{request.status}</TableCell>
                    <TableCell style={{maginLeft:'2px'}}>
                      {request.status === 'Pending' && (
                        <>
                          <Button
                              style={{  color:'green'}}
                            
                           
                            onClick={() => handleAccept(request.empID)}
                          >
                            <CheckCircleOutlineRoundedIcon/>
                          </Button>
                          <Button 
                            style={{color:'red'}}
                            onClick={() => handleReject(request.empID)}
                          >
                           <CancelOutlinedIcon/>
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></div>
  )
}

export default GrantAccess