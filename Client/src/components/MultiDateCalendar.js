


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Button } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import './MultiDateCalendar.css';
import { useNavigate } from "react-router-dom";
import CurrentBookings from './CurrentBookings';

const MultiDateCalendar = ({ showNewsFeed, selectedDates, setSelectedDates, user, setUser, isUser }) => {
  const navigate = useNavigate();
  
  if(!isUser || !user.userId || user.userId === ''){
    navigate("/");
    // navigate("/login");
    // window.location.href = "/login";
  }

  console.log(showNewsFeed);
  const handleDateClick = (date) => {
    if (date.getDay() === 0) {
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


  if (!user || !user.userId || user.userId === '') {
    // navigate("/login");
    window.location.href = "/login";
  }

  // if(!user.isAdmin){
  //   return (
  //     <div>Unauthorized!</div>
  //   )
  // }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '664px',
        width: '76.1vw',


      }}
    >
      <div style={{ flex: 0, height: '5%', backgroundColor: '#003A64' }}>
        <marquee behavior="scroll" direction="left" height="30px" style={{ color: 'white', fontSize: '12px' }}>
          <p className='text-update'>As the world's leading derivatives marketplace, CME Group enables clients to trade futures, options, cash and OTC markets, optimize portfolios, and analyze data – empowering market participants worldwide to efficiently manage risk and capture opportunities. </p>
        </marquee>
      </div>
      <div >

        <div style={{
          fontSize: '29px',
          fontFamily: 'poppins',
          fontWeight: 600,
          marginLeft: '90px',
          paddingTop: '20px',
          color: '#0071BA'
        }}>
          <span style={{ color: '#0071BA' }}>Plan </span>
          <span>Your Day:</span>
        </div>


        <div className="calendar" >
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
            style={{ height: '2vw', width: '1.5vw', marginTop: '-60px', marginLeft: '790px' }}
            onClick={() => {
              console.log(user);
              navigate('/bookings');
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


