// import React, { useState, useEffect } from 'react';
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, TextField } from '@mui/material';
// import * as XLSX from 'xlsx';

// const Requests = () => {
//     const initialData = [
//         { EmpID: '1234', Service: 'Desk', date: '01/02/2023' },
//         { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
//         { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
//         { EmpID: '1234', Service: 'Lunch', date: '01/02/2023' },
//         { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
//         { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
//         { EmpID: '1234', Service: 'Cab', date: '02/02/2023' },
//         { EmpID: '1330', Service: 'Cab', date: '05/11/2023' },
//         { EmpID: '1332', Service: 'Desk', date: '06/11/2023' },
//         { EmpID: '1326', Service: 'Lunch', date: '07/01/2024' },
//         { EmpID: '1272', Service: 'Cab', date: '01/02/2023' },
//         { EmpID: '1271', Service: 'Desk', date: '15/03/2023' },
//         { EmpID: '1348', Service: 'Lunch', date: '20/04/2023' },
//         { EmpID: '1370', Service: 'Desk', date: '20/12/2023' },
//         { EmpID: '1341', Service: 'Lunch', date: '20/11/2023' },
//     ];

//     const [data, setData] = useState(initialData);
//     const [filterRange, setFilterRange] = useState('all');
//     const [filterService, setFilterService] = useState('all');
//     const [filteredData, setFilteredData] = useState(initialData);
//     const [filterEmpID, setFilterEmpID] = useState('');

//     useEffect(() => {
//         filterData(filterRange, filterService, filterEmpID);
//     }, [filterRange, filterService, filterEmpID]);

//     const handleFilterChange = (event) => {
//         setFilterRange(event.target.value);
//     };

//     const handleServiceFilterChange = (event) => {
//         setFilterService(event.target.value);
//     };

//     const handleEmpIDFilterChange = (event) => {
//         setFilterEmpID(event.target.value);
//     };

//     const filterData = (dateCondition, serviceCondition, empIDCondition) => {
//         let filtered = initialData;

//         if (dateCondition !== 'all') {
//             const currentDate = new Date();
//             currentDate.setHours(0, 0, 0, 0);
//             let futureDate = new Date(currentDate);

//             if (dateCondition === '1w') {
//                 futureDate.setDate(currentDate.getDate() + 7);
//             } else if (dateCondition === '1m') {
//                 futureDate.setMonth(currentDate.getMonth() + 1);
//             } else if (dateCondition === '6m') {
//                 futureDate.setMonth(currentDate.getMonth() + 6);
//             }

//             filtered = filtered.filter((item) => {
//                 const itemDate = parseDate(item.date);
//                 return (
//                     itemDate >= currentDate &&
//                     itemDate <= futureDate &&
//                     (serviceCondition === 'all' || item.Service === serviceCondition)
//                 );
//             });
//         }

//         if (empIDCondition !== '') {
//             filtered = filtered.filter((item) => item.EmpID.includes(empIDCondition));
//         }

//         setFilteredData(groupData(filtered));
//     };

//     const parseDate = (dateString) => {
//         const [day, month, year] = dateString.split('/');
//         return new Date(year, month - 1, day);
//     };

//     const groupData = (data) => {
//         const groupedData = [];

//         data.forEach((item) => {
//             const existingGroup = groupedData.find((group) => group.EmpID === item.EmpID && group.date === item.date);

//             if (existingGroup) {
//                 existingGroup.Service = `${existingGroup.Service}, ${item.Service}`;
//             } else {
//                 groupedData.push({ EmpID: item.EmpID, date: item.date, Service: item.Service });
//             }
//         });

//         return groupedData;
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(filteredData);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
//         XLSX.writeFile(wb, 'aditi.xlsx');
//     };

//     return (
//       <div>
//       <div style={{ paddingTop: '3vw', display: 'flex', paddingRight: '10vw' ,marginLeft:'9vw'}}>
//           <TextField
//               label="Filter by Employee ID"
//               value={filterEmpID}
//               onChange={handleEmpIDFilterChange}
//           />
//           <Select
//               label="Filter by Service"
//               value={filterService}
//               onChange={handleServiceFilterChange}
//           >
//               <option value="all">All</option>
//               <option value="Cab">Cab</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Desk">Desk</option>
//           </Select>
//           <Select
//               label="Filter by Date"
//               value={filterRange}
//               onChange={handleFilterChange}
//           >
//               <option value="all">All</option>
//               <option value="1w">1 week</option>
//               <option value="1m">1 month</option>
//               <option value="6m">6 months</option>
//           </Select>
//           <div style={{ paddingLeft: '5vw' }}>
//               <Button
//                   variant="contained"
//                   onClick={exportToExcel}
//                   style={{
//                       marginLeft: '39vw',
//                       height: '2vw',
//                       width: '12vw',
//                       backgroundColor: '#FFDB58',
//                   }}
//               >
//                   Export To Excel
//               </Button>
//           </div>
//       </div>
//       <div style={{ width: '80vw' }}>
//           <Paper>
//               <TableContainer style={{ maxHeight: 440 ,marginLeft:'9vw'}}>
//                   <Table stickyHeader>
//                       <TableHead>
//                           <TableRow>
//                               <TableCell style={{ background: 'lightgrey' }}>Employee ID</TableCell>
//                               <TableCell style={{ background: 'lightgrey' }}>Date</TableCell>
//                               <TableCell style={{ background: 'lightgrey' }}>Services</TableCell>
//                           </TableRow>
//                       </TableHead>
//                       <TableBody>
//                           {filteredData.map((item, index) => (
//                               <TableRow key={index}>
//                                   <TableCell>{item.EmpID}</TableCell>
//                                   <TableCell>{item.date}</TableCell>
//                                   <TableCell>{item.Service}</TableCell>
//                               </TableRow>
//                           ))}
//                       </TableBody>
//                   </Table>
//               </TableContainer>
//           </Paper>
//       </div>
//   </div>
//     );
// };

// export default Requests;

// import React, { useState, useEffect } from 'react';
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, TextField } from '@mui/material';
// import * as XLSX from 'xlsx';
// import './Requests.css'
// import { Score } from '@mui/icons-material';
// const Requests = () => {

//   const initialData = [
//             { EmpID: '1234', Service: 'Desk', date: '01/02/2023' },
//             { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
//             { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
//             { EmpID: '1234', Service: 'Lunch', date: '01/02/2023' },
//             { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
//             { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
//             { EmpID: '1234', Service: 'Cab', date: '02/02/2023' },
//             { EmpID: '1330', Service: 'Cab', date: '05/11/2023' },
//             { EmpID: '1332', Service: 'Desk', date: '06/11/2023' },
//             { EmpID: '1326', Service: 'Lunch', date: '07/01/2024' },
//             { EmpID: '1272', Service: 'Cab', date: '01/02/2023' },
//             { EmpID: '1271', Service: 'Desk', date: '15/03/2023' },
//             { EmpID: '1348', Service: 'Lunch', date: '20/04/2023' },
//             { EmpID: '1370', Service: 'Desk', date: '20/12/2023' },
//             { EmpID: '1341', Service: 'Lunch', date: '20/11/2023' },
//         ];

//             const [data, setData] = useState(initialData);
//     const [filterRange, setFilterRange] = useState('all');
//     const [filterService, setFilterService] = useState('all');
//     const [filteredData, setFilteredData] = useState(initialData);
//     const [filterEmpID, setFilterEmpID] = useState('');

//     useEffect(() => {
//         filterData(filterRange, filterService, filterEmpID);
//     }, [filterRange, filterService, filterEmpID]);

//     const handleFilterChange = (event) => {
//         setFilterRange(event.target.value);
//     };

//     const handleServiceFilterChange = (event) => {
//         setFilterService(event.target.value);
//     };

//     const handleEmpIDFilterChange = (event) => {
//         setFilterEmpID(event.target.value);
//     };

//     const filterData = (dateCondition, serviceCondition, empIDCondition) => {
//         let filtered = initialData;

//         if (dateCondition !== 'all') {
//             const currentDate = new Date();
//             currentDate.setHours(0, 0, 0, 0);
//             let futureDate = new Date(currentDate);

//             if (dateCondition === '1w') {
//                 futureDate.setDate(currentDate.getDate() + 7);
//             } else if (dateCondition === '1m') {
//                 futureDate.setMonth(currentDate.getMonth() + 1);
//             } else if (dateCondition === '6m') {
//                 futureDate.setMonth(currentDate.getMonth() + 6);
//             }

//             filtered = filtered.filter((item) => {
//                 const itemDate = parseDate(item.date);
//                 return (
//                     itemDate >= currentDate &&
//                     itemDate <= futureDate &&
//                     (serviceCondition === 'all' || item.Service === serviceCondition)
//                 );
//             });
//         }

//         if (empIDCondition !== '') {
//             filtered = filtered.filter((item) => item.EmpID.includes(empIDCondition));
//         }

//         setFilteredData(groupData(filtered));
//     };

//     const parseDate = (dateString) => {
//         const [day, month, year] = dateString.split('/');
//         return new Date(year, month - 1, day);
//     };

//     const groupData = (data) => {
//         const groupedData = [];

//         data.forEach((item) => {
//             const existingGroup = groupedData.find((group) => group.EmpID === item.EmpID && group.date === item.date);

//             if (existingGroup) {
//                 existingGroup.Service = `${existingGroup.Service}, ${item.Service}`;
//             } else {
//                 groupedData.push({ EmpID: item.EmpID, date: item.date, Service: item.Service });
//             }
//         });

//         return groupedData;
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(filteredData);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
//         XLSX.writeFile(wb, 'aditi.xlsx');
//     };

//   return (
//     <div className='gradient_background'>
//        <div style={{ paddingTop: '-50vw', display: 'flex',marginLeft:'1vw',color:'white'}}>
//            <TextField
//               label="Filter by Employee ID"
//               value={filterEmpID}
//               onChange={handleEmpIDFilterChange}
//           />
//           <Select
//               label="Filter by Service"
//               value={filterService}
//               onChange={handleServiceFilterChange}
//           >
//               <option value="all">All</option>
//               <option value="Cab">Cab</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Desk">Desk</option>
//           </Select>
//           <Select
//               label="Filter by Date"
//               value={filterRange}
//               onChange={handleFilterChange}
//           >
//               <option value="all">All</option>
//               <option value="1w">1 week</option>
//               <option value="1m">1 month</option>
//               <option value="6m">6 months</option>
//           </Select>
//           <div style={{ paddingLeft: '5vw' }}>
//               <Button

//                   onClick={exportToExcel}
//                   style={{
//                     marginTop:'2vw',
//                       marginLeft: '50vw',
//                       height: '2vw',
//                       width: '12vw',
//                       color: '#FFDB58',
//                   }}
//               >
//                   Export To Excel
//               </Button>
//           </div>
//       </div>
//       <div>
//         <TableContainer component={Paper} style={{ width: '70vw',  marginTop: '2vw',  marginLeft: '15vw', maxHeight: 460 ,justifyContent: 'center'}} className='table1' >
//           <Table sx={{ minWidth: 500 }} stickyHeader>
//             <TableHead className='tablehead'>
//               <TableRow>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Employee ID</TableCell>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Date</TableCell>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Services</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{item.EmpID}</TableCell>
//                   <TableCell>{item.date}</TableCell>
//                   <TableCell>{item.Service}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   )
// }

// export default Requests

// 2nd attempt

// import React, { useState, useEffect } from 'react';
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, TextField,MenuItem } from '@mui/material';
// import * as XLSX from 'xlsx';
// import './Requests.css'
// import { Score } from '@mui/icons-material';
// const Requests = () => {

//   const initialData = [
//             { EmpID: '1234', Service: 'Desk', date: '01/02/2023' },
//             { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
//             { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
//             { EmpID: '1234', Service: 'Lunch', date: '01/02/2023' },
//             { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
//             { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
//             { EmpID: '1234', Service: 'Cab', date: '02/02/2023' },
//             { EmpID: '1330', Service: 'Cab', date: '05/11/2023' },
//             { EmpID: '1332', Service: 'Desk', date: '06/11/2023' },
//             { EmpID: '1326', Service: 'Lunch', date: '07/01/2024' },
//             { EmpID: '1272', Service: 'Cab', date: '01/02/2023' },
//             { EmpID: '1271', Service: 'Desk', date: '15/03/2023' },
//             { EmpID: '1348', Service: 'Lunch', date: '20/04/2023' },
//             { EmpID: '1370', Service: 'Desk', date: '20/12/2023' },
//             { EmpID: '1341', Service: 'Lunch', date: '20/11/2023' },
//         ];

//             const [data, setData] = useState(initialData);
//     const [filterRange, setFilterRange] = useState('all');
//     const [filterService, setFilterService] = useState('all');
//     const [filteredData, setFilteredData] = useState(initialData);
//     const [filterEmpID, setFilterEmpID] = useState('');

//     useEffect(() => {
//         filterData(filterRange, filterService, filterEmpID);
//     }, [filterRange, filterService, filterEmpID]);

//     const handleFilterChange = (event) => {
//         setFilterRange(event.target.value);
//     };

//     const handleServiceFilterChange = (event) => {
//         setFilterService(event.target.value);
//     };

//     const handleEmpIDFilterChange = (event) => {
//         setFilterEmpID(event.target.value);
//     };

//     const filterData = (dateCondition, serviceCondition, empIDCondition) => {
//       let filtered = initialData;

//       if (dateCondition !== 'all') {
//         const currentDate = new Date();
//         currentDate.setHours(0, 0, 0, 0);
//         let futureDate = new Date(currentDate);

//         if (dateCondition === '1w') {
//           futureDate.setDate(currentDate.getDate() + 7);
//         } else if (dateCondition === '1m') {
//           futureDate.setMonth(currentDate.getMonth() + 1);
//         } else if (dateCondition === '6m') {
//           futureDate.setMonth(currentDate.getMonth() + 6);
//         }

//         filtered = filtered.filter((item) => {
//           const itemDate = parseDate(item.date);
//           return (
//             itemDate >= currentDate &&
//             itemDate <= futureDate &&
//             (serviceCondition === 'all' || item.Service.toLowerCase() === serviceCondition.toLowerCase())
//           );
//         });
//       }

//       if (empIDCondition !== '') {
//         filtered = filtered.filter((item) => item.EmpID.includes(empIDCondition));
//       }

//       setFilteredData(groupData(filtered));
//     };

//     const parseDate = (dateString) => {
//         const [day, month, year] = dateString.split('/');
//         return new Date(year, month - 1, day);
//     };

//     const groupData = (data) => {
//         const groupedData = [];

//         data.forEach((item) => {
//             const existingGroup = groupedData.find((group) => group.EmpID === item.EmpID && group.date === item.date);

//             if (existingGroup) {
//                 existingGroup.Service = `${existingGroup.Service}, ${item.Service}`;
//             } else {
//                 groupedData.push({ EmpID: item.EmpID, date: item.date, Service: item.Service });
//             }
//         });

//         return groupedData;
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(filteredData);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
//         XLSX.writeFile(wb, 'aditi.xlsx');
//     };

//   return (
//     <div className='gradient_background'>
//        <div style={{ paddingTop: '-50vw', display: 'flex',marginLeft:'1vw',color:'white'}}>
//            <TextField
//               label="Filter by Employee ID"
//               value={filterEmpID}
//               onChange={handleEmpIDFilterChange}
//           />
//           <Select
//       label="Filter by Service"
//       value={filterService}
//       onChange={handleServiceFilterChange}
//     >
//       <MenuItem value="all">All</MenuItem>
//       <MenuItem value="Cab">Cab</MenuItem>
//       <MenuItem value="Lunch">Lunch</MenuItem>
//       <MenuItem value="Desk">Desk</MenuItem>
//     </Select>
//           <Select
//               label="Filter by Date"
//               value={filterRange}
//               onChange={handleFilterChange}
//           >
//               <option value="all">All</option>
//               <option value="1w">1 week</option>
//               <option value="1m">1 month</option>
//               <option value="6m">6 months</option>
//           </Select>
//           <div style={{ paddingLeft: '5vw' }}>
//               <Button

//                   onClick={exportToExcel}
//                   style={{
//                     marginTop:'2vw',
//                       marginLeft: '50vw',
//                       height: '2vw',
//                       width: '12vw',
//                       color: '#FFDB58',
//                   }}
//               >
//                   Export To Excel
//               </Button>
//           </div>
//       </div>
//       <div>
//         <TableContainer component={Paper} style={{ width: '70vw',  marginTop: '2vw',  marginLeft: '15vw', maxHeight: 460 ,justifyContent: 'center'}} className='table1' >
//           <Table sx={{ minWidth: 500 }} stickyHeader>
//             <TableHead className='tablehead'>
//               <TableRow>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Employee ID</TableCell>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Date</TableCell>
//                 <TableCell style={{ backgroundColor: '#043570' }}>Services</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{item.EmpID}</TableCell>
//                   <TableCell>{item.date}</TableCell>
//                   <TableCell>{item.Service}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   )
// }

// export default Requests

import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import "./Requests.css";
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';

const Requests = () => {
  const initialData = [
    { EmpID: "1234", Service: "Desk", date: "01/02/2023" },
    { EmpID: "1234", Service: "Cab", date: "01/02/2023" },
    { EmpID: "1235", Service: "Desk", date: "15/03/2023" },
    { EmpID: "1234", Service: "Lunch", date: "01/02/2023" },
    { EmpID: "1325", Service: "Desk", date: "20/12/2023" },
    { EmpID: "1329", Service: "Lunch", date: "20/11/2023" },
    { EmpID: "1234", Service: "Cab", date: "02/02/2023" },
    { EmpID: "1330", Service: "Cab", date: "05/11/2023" },
    { EmpID: "1332", Service: "Desk", date: "06/11/2023" },
    { EmpID: "1326", Service: "Lunch", date: "07/01/2024" },
    { EmpID: "1272", Service: "Cab", date: "01/02/2023" },
    { EmpID: "1271", Service: "Desk", date: "15/03/2023" },
    { EmpID: "1348", Service: "Lunch", date: "20/04/2023" },
    { EmpID: "1370", Service: "Desk", date: "20/12/2023" },
    { EmpID: "1341", Service: "Lunch", date: "20/11/2023" },
  ];

  // const [filterService, setFilterService] = useState('Service Type');

  // const handleServiceFilterChange = (event) => {
  //           setFilterService(event.target.value);
  //       };
    
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Employee Id"
          style={{
            width: "10vw",
            height: "45px",
            marginLeft: "48vw",
            color: "grey",
            justifyContent: "center",
            paddingLeft: "15px",
            borderRadius:'8px',
            border:'1px solid #C3C3C3' 
          }}
        />

        <select  placeholder="Service Type" 
         
               
               style={{width: "10vw",
               height: "50px",
               color: "grey",
              marginLeft:'0.3vw',
              paddingLeft: "15px",
              borderRadius:'8px',
              border:'1px solid #C3C3C3' }}
               
               >
          <option value="Car">Car</option>
          <option value="Desk">Desk</option>
          
          <option value="Lunch">Lunch</option>
          <option value="all">all</option>
        </select>

        <select  placeholder="Choose date" 
         
               
               style={{width: "10vw",
               height: "50px",
               color: "grey",
              marginLeft:'0.3vw',
              paddingLeft: "15px",
              borderRadius:'8px',
              border:'1px solid #C3C3C3' }}
               
               >
          <option value="1w">1 week</option>
          <option value="1m">1 month</option>
          
          <option value="6m">6 months</option>
          <option value="all">all</option>
        </select>


        <Fab  aria-label="Search" style={{marginLeft:'20px', backgroundColor:'#79C6F1' ,color:'white'}}>
        <SearchIcon />
      </Fab>
      </div>

      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "70vw",
            marginTop: "1vw",
            marginLeft: "15vw",
            maxHeight: 520,
            justifyContent: "center",
            border: "1px solid #E9E9E9",
            borderRadius: "10px",
          }}
          className="table1"
        >
          <Table sx={{ minWidth: 500 }} stickyHeader>
            <TableHead className="tablehead">
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Employee ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Services
                </TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "	#F5F5F5" }}>
              {initialData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "#0071BA", fontWeight: "bold" }}>
                    {item.EmpID}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.Service}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Requests;
