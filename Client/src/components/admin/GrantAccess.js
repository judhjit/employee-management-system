// import React, { useState } from 'react';
// import './GrantAccess.css';
// import DoneIcon from '@mui/icons-material/Done';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const GrantAccess = () => {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([
//     { empID: '1234', name: 'ajeet', status: 'Pending' },
//     { empID: '1235', name: 'sumit', status: 'Pending' },
//     { empID: '1236', name: 'amit', status: 'Pending' },
//     { empID: '1237', name: 'abc', status: 'Pending' },
//     { empID: '1238', name: 'abc', status: 'Pending' },
//     { empID: '1239', name: 'abc', status: 'Pending' },
//     { empID: '1242', name: 'abc', status: 'Pending' },
//   ]);

//   const handleAccept = (empID) => {
//     const updatedRequests = requests.map((request) =>
//       request.empID === empID ? { ...request, status: 'Accepted' } : request
//     );
//     setRequests(updatedRequests);
//   };

//   const handleReject = (empID) => {
//     const updatedRequests = requests.map((request) =>
//       request.empID === empID ? { ...request, status: 'Rejected' } : request
//     );
//     setRequests(updatedRequests);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
//       <h2 style={{ textAlign: 'center' }} onClick={() => navigate('/analytics')}>Grant News Access Requests</h2>
//       <Button style={{ right: '-700px', fontSize: '0.8vw' }} onClick={ ()=>navigate('/viewAllAdmin')}>View all news Admins</Button>
//       <TableContainer component={Paper} style={{ width: '80vw', margin: 'auto',paddingLeft:'10vw' }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Employee ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.map((request) => (
//               <TableRow key={request.empID}>
//                 <TableCell>{request.empID}</TableCell>
//                 <TableCell>{request.name}</TableCell>
//                 <TableCell>{request.status}</TableCell>
//                 <TableCell style={{paddingRight:'60px'}}>
//                   {request.status === 'Pending' && (
//                     <>
//                       <Button
//                           style={{marginRight:'10px'  ,color:'green'}}
                        
                       
//                         onClick={() => handleAccept(request.empID)}
//                       >
//                         <CheckCircleOutlineIcon/>
//                       </Button>
//                       <Button 
                        
//                         onClick={() => handleReject(request.empID)}
//                       >
//                        <CheckCircleOutlineIcon/>
//                       </Button>
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//     </div>
//   );
// };

// export default GrantAccess;


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
    <div> 
      
      <h1 style={{margin:'auto', marginLeft:'38vw'}}>Grant News Access:-</h1>
      <Button style={{ right: '-1200px', fontSize: '0.8vw' }} onClick={ ()=>navigate('/viewAllAdmin')}>View all news Admins</Button>
      <TableContainer component={Paper} style={{
      width: "80vw",
      marginTop: "0.2vw",
      marginLeft: "10vw",
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
