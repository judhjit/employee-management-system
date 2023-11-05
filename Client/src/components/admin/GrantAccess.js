import React, { useState } from 'react';
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

const GrantAccess = () => {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <h2 style={{ textAlign: 'center' }}>Grant Access Requests</h2>
      <TableContainer component={Paper} style={{ width: '1000px', margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.empID}>
                <TableCell>{request.empID}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAccept(request.empID)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleReject(request.empID)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GrantAccess;
