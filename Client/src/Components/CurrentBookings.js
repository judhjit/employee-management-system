


import React, { useState } from 'react';
import './CurrentBookings.css'; // Import CSS file
import { Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CurrentBookings = () => {
  // Sample data for the table
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

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        cab: editedCab,
        meal: editedMeal,
      };
      setData(updatedData);
      setEditIndex(null);
    }
  };

  return (
    <div className="table-container">
      <h style={{ fontSize: '25px', textAlign: 'left', fontWeight: '500'}} className="booking">
            <span style={{ color: '#0071BA' }}>Current </span>
            <span>Bookings</span>
          </h>
      <table>
        <thead className="sticky-thead">
          <tr>
            <th>SL NO</th>
            <th>DATE</th>
            <th>DESK</th>
            <th>CAB</th>
            <th>MEAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Slno}</td>
              <td>{row.date}</td>
              <td>
                {row.desk} <IconButton
                  variant="contained"
                  style={{ color: 'red' }}
                  onClick={() => handleCancelDesk(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
              <td>
                {editIndex === index ? (
                  <select
                    value={editedCab}
                    onChange={(e) => setEditedCab(e.target.value)}
                  >
                    <option value="9:00am-5:00pm">9:00am-5:00pm</option>
                    <option value="5:00am-2:00pm">5:00am-2:00pm</option>
                    <option value="6:00am-3:00pm">6:00am-3:00pm</option>
                  </select>
                ) : (
                  row.cab
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <select
                    value={editedMeal}
                    onChange={(e) => setEditedMeal(e.target.value)}
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                ) : (
                  row.meal
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Button variant="contained"
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => handleSave(index)}
                >Save</Button>
                ) : (
                  <IconButton variant="contained" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentBookings;





