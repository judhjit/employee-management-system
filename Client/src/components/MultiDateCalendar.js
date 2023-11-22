// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { Box, Button } from '@mui/material';
// import 'react-calendar/dist/Calendar.css';
// import './MultiDateCalendar.css';
// import Navbar from './Navbar';
// import NewsFeed from './NewsFeed';
// import {Link } from 'react-router-dom';
// import {useNavigate} from "react-router-dom";
// import CurrentBookings from './CurrentBookings';


// const MultiDateCalendar = ({showNewsFeed,selectedDates,setSelectedDates}) => {
// //   const [selectedDates, setSelectedDates] = useState([]);

// //   const [showNewsFeed,setShowNewsFeed]=useState(true);

// const handleDateClick = (date) => {
//   if (date.getDay() === 0 || date.getDay() === 6) {
//     return;
//   }

//   let newSelectedDates;

//   const dateIndex = selectedDates.findIndex(
//     (selectedDate) => selectedDate.toDateString() === date.toDateString()
//   );

//   if (dateIndex !== -1) {
//     newSelectedDates = selectedDates.filter((d) => d.toDateString() !== date.toDateString());
//   } else {
//     newSelectedDates = [...selectedDates, date];
//   }

//   setSelectedDates(newSelectedDates);
  
// };

//   const handleBookClick = () => {
//     console.log('Selected Dates:', selectedDates.map(date => date.toDateString()));
//   };


//   const navigate = useNavigate();


//   return (
//     <div style={{ backgroundColor: '#D9DAE9', height: '741px',width:'100vw'}}>
//       {/* <Navbar selectedDates={selectedDates}  showNewsFeed={showNewsFeed} setShowNewsFeed={setShowNewsFeed}/> */}
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1, padding: '20px' }}>
//           <h style={{ fontSize: '32px', textAlign: 'left', fontWeight: '500', margin: '50px' }}>
//             <span style={{ color: '#0071BA' }}>Plan </span>
//             <span>Your Day:</span>
//           </h>
//           <div className="calendar">
//             <Calendar
//               onClickDay={handleDateClick}
//               tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
//               tileClassName={({ date }) =>
//                 selectedDates.find(
//                   (selectedDate) => selectedDate.toDateString() === date.toDateString()
//                 )
//                   ? 'selected'
//                   : ''
//               }
//             />
             
//               <Button variant="contained" color="primary" style={{ height: '2vw', width: '1.5vw' }}  onClick={() => {
//               console.log(selectedDates)
//               navigate("/deskbooking")
//             }}>
//                 Book
//               </Button>
            
//           </div>
//         </div>
//         {/* {showNewsFeed && ( // Conditionally render NewsFeed if showNewsFeed is true
//           <div style={{ flex: 1, padding: '20px', maxWidth: '350px', height: '605px', backgroundColor: '#12184c' }}>
//             <NewsFeed style={{ height: '840px' }} />
//           </div>
//         )} */}
        
//       </div>
//       <CurrentBookings/>
//     </div>
//   );
// };

// export default MultiDateCalendar;



// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { Box, Button } from '@mui/material';
// import 'react-calendar/dist/Calendar.css';
// import './MultiDateCalendar.css';
// import { useNavigate } from "react-router-dom";
// import CurrentBookings from './CurrentBookings';

// const MultiDateCalendar = ({ selectedDates, setSelectedDates, user, setUser }) => {

//   const handleDateClick = (date) => {
//     if (date.getDay() === 0 || date.getDay() === 6) {
//       return;
//     }

//     let newSelectedDates;

//     const dateIndex = selectedDates.findIndex(
//       (selectedDate) => selectedDate.toDateString() === date.toDateString()
//     );

//     if (dateIndex !== -1) {
//       newSelectedDates = selectedDates.filter((d) => d.toDateString() !== date.toDateString());
//     } else {
//       newSelectedDates = [...selectedDates, date];
//     }

//     setSelectedDates(newSelectedDates);

//     // Update the user state with the new selected dates
//     setUser((prevUser) => ({ ...prevUser, selectedDate: newSelectedDates }));
//   };

//   const navigate = useNavigate();

//   return (
//     <div style={{ backgroundColor: '#D9DAE9', height: '741px', width: '100vw' }}>
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1, padding: '20px' }}>
//           <h style={{ fontSize: '32px', textAlign: 'left', fontWeight: '500', margin: '50px' }}>
//             <span style={{ color: '#0071BA' }}>Plan </span>
//             <span>Your Day:</span>
//           </h>
//           <div className="calendar">
//             <Calendar
//               onClickDay={handleDateClick}
//               tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
//               tileClassName={({ date }) =>
//                 selectedDates.find(
//                   (selectedDate) => selectedDate.toDateString() === date.toDateString()
//                 )
//                   ? 'selected'
//                   : ''}
//               />
//             <Button variant="contained" color="primary" style={{ height: '2vw', width: '1.5vw' }} onClick={() => {
//               console.log(user);
//               navigate("/deskbooking");
//             }}>
//               Book
//             </Button>
//           </div>
//         </div>
//       </div>
//       <CurrentBookings />
//     </div>
//   );
// };
// export default MultiDateCalendar;






import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Box, Button } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import './MultiDateCalendar.css';
import { useNavigate } from 'react-router-dom';
import CurrentBookings from './CurrentBookings';
import api from '../api';

const MultiDateCalendar = ({ showNewsFeed, selectedDates, setSelectedDates, user, setUser, isUser, socket }) => {
  const navigate = useNavigate();
  const [newsTitles, setNewsTitles] = useState([]);

  useEffect(() => {
    const fetchNewsTitles = async () => {
      try {
        const response = await api.get('/user/news');
        setNewsTitles(response.data.map((post) => post.title));
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const handleNewsUpdate = ({ title }) => {
      setNewsTitles((prevTitles) => [...prevTitles, title]);
    };

    const handleNewsDeletion = ({ newsId }) => {
      setNewsTitles((prevTitles) => prevTitles.filter((post) => post.newsId !== newsId));
    };

    fetchNewsTitles();

    if (showNewsFeed) {
      socket.on('newsfeed:refresh', fetchNewsTitles);
      socket.on('news:updated', handleNewsUpdate);
      socket.on('news:deleted', handleNewsDeletion);
    }

    return () => {
      if (showNewsFeed) {
        socket.off('newsfeed:refresh', fetchNewsTitles);
        socket.off('news:updated', handleNewsUpdate);
        socket.off('news:deleted', handleNewsDeletion);
      }
    };
  }, [showNewsFeed, socket]);

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
    navigate('/login');
  }


  return (
    <div style={{ backgroundColor: 'white', height: '664px', width: '76.1vw' }}>
      <div style={{ flex: 0, height: '5%', width: '100vw', backgroundColor: '#003A64' }}>
        <marquee behavior="scroll" direction="left" height="30px" vspace="4" style={{ color: 'yellow', fontSize: '16px' }}>
          {newsTitles.map((title, index) => (
            <span key={index}>{title}{index < newsTitles.length - 1 && '  |  '}</span>
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
            onClick={() => {
              console.log(user);
              navigate('/bookings');
            }}
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
