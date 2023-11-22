import React, { useState, useEffect } from 'react';
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
import api from '../../api';


const ViewAllAdmin = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    let response;
    try {
      response = await api.get('/admin/allnewsadmins');
      console.log(response.data);
      setEmployees([...response.data]);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("No data found!");
        setEmployees([]);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveEmployee = async (userId) => {
    let response;
    try {
      response = await api.patch('/admin/togglenewsadmin', {
        userId: userId,
        isNewsAdmin: false
      });
      fetchData();
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
      // margin: "auto auto",
      margin: "0 auto",
    }}>

      <h1>Manage News Admins</h1>

      <TableContainer component={Paper} style={{
        width: "68vw",
        // marginTop: "-2vw",
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
              }}>User ID</TableCell>
              <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins'
              }}>Name</TableCell>
              <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins'
              }}>Email ID</TableCell>

              <TableCell style={{
                backgroundColor: "#004B81",
                color: "white",
                fontSize: "14px",
                fontFamily: 'poppins',
                marginLeft: '20px'
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "	#F5F5F5" }} >
            {employees.map((employee) => (
              <TableRow key={employee.userId}>
                <TableCell style={{ color: "#79C6F1", fontWeight: "bold", fontFamily: 'poppins', paddingTop: '6px' }}>{employee.userId}</TableCell>
                <TableCell style={{ color: "#0071BA", fontWeight: "bold", fontFamily: 'poppins' }}>{employee.name}</TableCell>
                <TableCell style={{ color: "#0071BA", fontWeight: "bold", fontFamily: 'poppins' }}>{employee.email}</TableCell>
                <TableCell style={{ maginLeft: '2px' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveEmployee(employee.userId)}
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
