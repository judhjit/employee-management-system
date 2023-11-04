import React, { useState } from 'react';
import './CurrentBookings.css'; 
import { Button } from '@mui/material';

const CurrentBookings = () => {

  const initialData = [
    { Slno: 1, date: '2023-11-15', desk: 'Desk 1', cab: '9:00-5:00', meal: 'Veg' },
    { Slno: 2, date: '2023-11-01', desk: 'Desk 2', cab: '9:00-5:00', meal: 'Non Veg' },
    { Slno: 3, date: '2023-11-05', desk: 'Desk 4', cab: '5:00-2:00', meal: 'Veg' },
    { Slno: 4, date: '2023-11-015', desk: 'Desk 5', cab: '9:00-5:00', meal: 'Non Veg' },
   
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
      <h2 className='booking' >Current Bookings</h2>
      <table>
        <thead className="sticky-thead">
          <tr>
            <th>Slno</th>
            <th>date</th>
            <th>desk</th>
            <th>cab</th>
            <th>meal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Slno}</td>
              <td>{row.date}</td>
              <td>
                {row.desk} <Button variant="contained"  style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleCancelDesk(index)}>Cancel</Button>
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
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => handleSave(index)}
                >Save</Button>
                ) : (
                  <Button variant="contained" onClick={() => handleEdit(index)}>Edit</Button>
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