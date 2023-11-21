


import React, { useState, useEffect, useReducer } from 'react';
import './GrantAccess.css';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import api from '../../api';

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
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await api.get('/admin/allnewsadminaccessrequests');
        console.log(response.data);
        setRequests([...response.data]);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("No data found!");
          setRequests([...requests]);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);



  const handleAccept = async (userId) => {
    let response;
    try {
      response = await api.patch('/admin/togglenewsadmin', {
        userId: userId,
        isNewsAdmin: true
      });
      setRequests([...requests.filter((request) => request.userId !== userId)]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleReject = async (userId) => {
    let response;
    try {
      response = await api.patch('/admin/togglenewsadmin', {
        userId: userId,
        isNewsAdmin: false
      });
      setRequests([...requests.filter((request) => request.userId !== userId)]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div style={{
      backgroundColor: "white",
      height: "520px",
      width: "75vw",
      textAlign: "center",
      margin: "0 auto",
    }} >

      <h1>Grant News Admin Access</h1>
      <Button style={{ fontSize: '0.8vw', marginLeft: '55vw', marginTop: "-4vw" }} onClick={() => navigate('/viewAllAdmin')}>View all news Admins</Button>
      <TableContainer component={Paper} style={{
        width: "68vw",
        marginTop: "-2vw",
        // marginTop: "13vw",
        marginLeft: "4vw",
        maxHeight: 480,
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
                fontFamily: 'poppins'
              }}>Employee ID</TableCell>
              <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins'
              }}>Name</TableCell>
              {/* <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins'
              }}>Status</TableCell> */}
              <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins',
                // marginLeft: '20px'
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "	#F5F5F5" }} >
            {requests.map((request) => (
              <TableRow key={request.userId}>
                <TableCell style={{ color: "#79C6F1", fontWeight: "bold", fontFamily: 'poppins', paddingTop: '6px' }}>{request.userId}</TableCell>
                <TableCell style={{ color: "#0071BA", fontWeight: "bold", fontFamily: 'poppins' }}>{request.name}</TableCell>
                {/* <TableCell style={{ fontFamily: 'poppins' }}>{request.status}</TableCell> */}
                <TableCell style={{ maginLeft: '2px' }}>
                  {/* {request.status === 'Pending' && ( */}
                  <>
                    <Button
                      style={{ color: 'green' }}


                      onClick={() => handleAccept(request.userId)}
                    >
                      <CheckCircleOutlineRoundedIcon />
                    </Button>
                    <Button
                      style={{ color: 'red' }}
                      onClick={() => handleReject(request.userId)}
                    >
                      <CancelOutlinedIcon />
                    </Button>
                  </>
                  {/* )} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>
  )
}

export default GrantAccess
