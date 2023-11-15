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

    // Update the user state with the new selected dates
    setUser((prevUser) => ({ ...prevUser, selectedDate: newSelectedDates }));
  };

  const navigate = useNavigate();
  return (
    
    <div style={{ height: '600px', width: '100vw', marginLeft:'60px'}}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1}}>
          <h style={{ fontSize: '18px', textAlign: 'left', fontWeight: '500'}}>
            <span style={{ color: '#0071BA' }}>Plan </span>
            <span>Your Day:</span>
          </h>
          <div className="calendar" >
            <Calendar
              className="custom-calendar"
              style={{height:'100px'}}
              onClickDay={handleDateClick}
              tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
              tileClassName={({ date }) =>
                selectedDates.find(
                  (selectedDate) => selectedDate.toDateString() === date.toDateString()
                )
                  ? 'selected'
                  : ''}
              />
            <Button variant="contained" className="bookbutton"  onClick={() => {
              console.log(user);
              navigate('/deskbooking');
            }}>
              Book
            </Button>
          </div>
        </div>
      </div>
      {/* <CurrentBookings /> */}
    </div>
    
  );
};

export default MultiDateCalendar;


