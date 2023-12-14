import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Box, Button } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import './MultiDateCalendar.css';
import { useNavigate } from 'react-router-dom';
import CurrentBookings from './CurrentBookings';
import api from '../api';

const MultiDateCalendar = ({ showNewsFeed, selectedDates, setSelectedDates, user, setUser, isUser, bookings, setBookings, socket }) => {
  const navigate = useNavigate();
  const [newsTitles, setNewsTitles] = useState([]);

  const fetchNewsTitles = async () => {
    try {
      const response = await api.get('/user/news');
      setNewsTitles(response.data.map((post) => post.title));
    } catch (error) {
      if (error.response.status === 404) {
        console.log("No data found!");
        setNewsTitles([]);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchNewsTitles();
    socket.on('newsfeed:refresh', fetchNewsTitles);
  }, []);

  // console.log(showNewsFeed);
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


  const handleBookButtonClick = () => {
    
    setBookings((prevBookings) => ({
      ...prevBookings,
      dates: [
        ...prevBookings.dates,
        ...selectedDates.map((selectedDate) => selectedDate.toISOString().slice(0, 10)),
      ],
    }));
    
    console.log(bookings);
    // Navigate to the /bookings page
    navigate('/bookings');
  };




  if (!user || !user.userId || user.userId === '') {
    // navigate("/");
    window.location.href = "/";
    return null;
  }


  return (
    <div style={{ backgroundColor: 'white', height: '664px', width: '76.1vw' }}>
      <div style={{ flex: 0, height: '5%', width: '100vw', backgroundColor: '#003A64' }}>
        <marquee behavior="scroll" direction="left" height="30px" vspace="4" style={{ color: 'yellow', fontSize: '16px' }}>
          {newsTitles.map((title, index) => (
            <span style={{ paddingRight: 20, paddingLeft: 20 }} key={index}>{title}{index < newsTitles.length - 1}</span>
          ))}
        </marquee>
      </div>
      <div>
        <div style={{ fontSize: '29px', fontFamily: 'poppins', fontWeight: 600, marginLeft: '90px', paddingTop: '20px', color: '#0071BA' }}>
          <span style={{ color: '#0071BA' }}>Plan </span>
          <span>Your Day:</span>
        </div>
        <div className="calendar">
          <Calendar
            onClickDay={handleDateClick}
            tileDisabled={({ date }) => date.getDay() === 0}
            tileClassName={({ date }) =>
              selectedDates.find(
                (selectedDate) => selectedDate.toDateString() === date.toDateString()
              )
                ? 'selected'
                : ''
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ height: '2vw', width: '1.5vw', marginTop: '-60px', marginLeft: '650px' }}
            onClick={handleBookButtonClick}
          >
            Book
          </Button>
        </div>
      </div>
      <div style={{ backgroundColor: '#F0F8FF', width: '100vw' }}>
        <CurrentBookings />
      </div>

    </div>

  );
};

export default MultiDateCalendar;