


import React, { useState } from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit'; 
import './CurrentBookings.css'

const CurrentBookings = () => {
  
  const initialData = [
    { Slno: 1, date: '2023-10-31', desk: 'Desk 1', cab: '9:00-5:00', meal: 'Veg' },
    { Slno: 2, date: '2023-11-01', desk: 'Desk 2', cab: '9:00-5:00', meal: 'Non Veg' },
  ];

  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editedCab, setEditedCab] = useState('Morning');
  const [editedMeal, setEditedMeal] = useState('Veg');

  const handleCancelDesk = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const handleEdit = (rowIndex) => {
    setEditIndex(rowIndex);
    setEditedCab(data[rowIndex].cab);
    setEditedMeal(data[rowIndex].meal);
  };

  const handleSave = (rowIndex) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        cab: editedCab,
        meal: editedMeal,
      };
      setData(updatedData);
      setEditIndex(null);
    }
  };

  return (
    <div className="table-container">
      <h2 className='booking'>Current Bookings</h2>
      <TableContainer style={{width:'100%',paddingLeft:'60px',height:'140px'}}>
        <Table>
          <TableHead >
            <TableRow style={{backgroundColor:'#0071BA'}} >

              <TableCell style={{padding:2,color:'white',fontFamily:'poppins'}}>Slno</TableCell>
              <TableCell  style={{padding:2,color:'white',fontFamily:'poppins'}}>date</TableCell>
              <TableCell  style={{padding:3,color:'white',fontFamily:'poppins'}}>desk</TableCell>
              <TableCell style={{padding:4,color:'white',fontFamily:'poppins'}}>cab</TableCell>
              <TableCell style={{padding:4,color:'white',fontFamily:'poppins'}}>meal</TableCell>
              <TableCell style={{padding:2,color:'white',fontFamily:'poppins'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}style={{padding:2}}>
                <TableCell style={{padding:2}}>{row.Slno}</TableCell>
                <TableCell style={{padding:2}}>{row.date}</TableCell>
                <TableCell style={{padding:2}}>
                  {row.desk}
                  <IconButton
                    color="secondary"
                    onClick={() => handleCancelDesk(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{padding:6}}>
                  {editIndex === index ? (
                    <Select
                      value={editedCab}
                      onChange={(e) => setEditedCab(e.target.value)}
                      
                    >
                      <option value="9:00am-5:00pm">9:00am-5:00pm</option>
                      <option value="5:00am-2:00pm">5:00am-2:00pm</option>
                      <option value="6:00am-3:00pm">6:00am-3:00pm</option>
                    </Select>
                  ) : (
                    row.cab
                  )}
                </TableCell>
                <TableCell style={{padding:5}}>
                  {editIndex === index ? (
                    <Select
                      value={editedMeal}
                      onChange={(e) => setEditedMeal(e.target.value)}
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non Veg">Non Veg</option>
                    </Select>
                  ) : (
                    row.meal
                  )}
                </TableCell>
                <TableCell style={{padding:2}}>
                  {editIndex === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index)}
                      
                    >
                      Save
                    </Button>
                  ) : (
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(index)}
                    >
                      <EditIcon />
                    </IconButton>
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

export default CurrentBookings;





