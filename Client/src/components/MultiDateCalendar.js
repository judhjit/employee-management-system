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



import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Button} from '@mui/material';
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


  if (!user || !user.userId || user.userId === '') {
    navigate("/login");
    // window.location.href = "/login";
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


