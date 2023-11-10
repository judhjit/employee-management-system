


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Button } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import './MultiDateCalendar.css';
import { useNavigate } from "react-router-dom";
import CurrentBookings from './CurrentBookings';

const MultiDateCalendar = ({ selectedDates, setSelectedDates, user, setUser }) => {

  const handleDateClick = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return;
    }

    let newSelectedDates;

    const dateIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (dateIndex !== -1) {
      newSelectedDates = selectedDates.filter((d) => d.toDateString() !== date.toDateString());
    } else {
      newSelectedDates = [...selectedDates, date];
    }

    setSelectedDates(newSelectedDates);

    
    setUser((prevUser) => ({ ...prevUser, selectedDate: newSelectedDates }));
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#D9DAE9',
        height: '741px',
        width: '100vw',
        textAlign: 'center',
        margin: '0 auto' 
      }}
    >
      <div style={{ padding: '20px' }}>
        <h
          style={{
            fontSize: '32px',
            textAlign: 'center',
            fontWeight: '500',
            margin: '50px'
          }}
        >
          <span style={{ color: '#0071BA' }}>Plan </span>
          <span>Your Day:</span>
        </h>
        <div className="calendar" style={{ marginLeft:'30vw'}}>
          <Calendar
            onClickDay={handleDateClick}
            tileDisabled={({ date }) => date.getDay() === 0}
            tileClassName={({ date }) =>
              selectedDates.find(
                selectedDate => selectedDate.toDateString() === date.toDateString()
              )
                ? 'selected'
                : ''
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ height: '2vw', width: '1.5vw', marginTop: '10px' }}
            onClick={() => {
              console.log(user);
              navigate('/deskbooking');
            }}
          >
            Book
          </Button>
        </div>
      </div>
      <CurrentBookings />
    </div>
  );
};

export default MultiDateCalendar;


