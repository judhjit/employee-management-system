// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import Alert from '@mui/material/Alert';
// import { Box, Button, Drawer, IconButton } from "@mui/material";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "react-calendar/dist/Calendar.css";
// import "./MultiDateCalendar.css";
// import { useNavigate } from "react-router-dom";
// import CurrentBookings from "./CurrentBookings";
// import Grid from '@mui/material/Grid';
// import api from "../api";
// import Loading from './Loading';
// import Divider from '@mui/material/Divider';
// import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
// import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const MultiDateCalendar = ({
//   // showNewsFeed,
//   selectedDates,
//   setSelectedDates,
//   user,
//   setUser,
//   isUser,
//   bookings,
//   setBookings,
//   // socket,
// }) => {
//   const navigate = useNavigate();
//   // const [newsTitles, setNewsTitles] = useState([]);
//   // const [errorMessage,setErrorMessage]=useState(null);
//   const [loading, setLoading] = useState(false);

//   const [disabledDates, setDisabledDates] = useState([]);
//   const [holidays,setHolidays]=useState([]);
//   const [currentBookingsOpen, setCurrentBookingsOpen] = useState(false);

//   useEffect(() => {
//     // fetchNewsTitles();
//     // socket.on("newsfeed:refresh", fetchNewsTitles);

//     setSelectedDates([]);
//     setBookings({
//       dates: [],
//       // deskId: [],
//       // workSlot: [],
//       preference: [],
//       // isDeskRequired: true,
//       // isCabRequired: false,
//       isFoodRequired: false,
//     });
//   }, []);

//   const fetchData = async () => {
//     let response;
//     try {
//       response = await api.post("/user/getbookings", {
//         // isDeskRequired: true,
//         // isCabRequired: true,
//         isFoodRequired: true,
//       });
//       console.log("res", response);

//       const dateBookedArray = response.data.map((item) => item.dateBooked);

//       console.log("dates", dateBookedArray);
//       setDisabledDates(dateBookedArray);
//       setLoading(true);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchHolidays=async()=>{
//     let response;
//     try {
//       response = await api.get("/user/getholidaysofthisandupcomingyears");
//       console.log("holiays",response.data.holidays);
//       setHolidays(response.data.holidays);
//     }
//     catch (error){
//       console.log("error fetching holidays",error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchHolidays();
//   }, []);

//   const handleCurrentBookingsClick = () => {
//     setCurrentBookingsOpen(true);
//   };

//   const handleCloseCurrentBookings = () => {
//     setCurrentBookingsOpen(false);
//   };

//   const handleDateClick = (date) => {
//     console.log("click",date);
//     const formattedDate=date.toISOString().split('T')[0];
//     console.log("format",formattedDate);
//     // const checkHoliday=holidays.find(holiday=>holiday.holiday_date===formattedDate);
//     // console.log("checked holiday",checkHoliday);
//     // const holidayDate=new Date(holiday.holiday_date);
//     // const holidayDateIndex=holidays.findIndex((holiday) => holiday.holiday_date.toDateString() === date.toDateString());
//     // console.log(holidayDateIndex);

//     const foundHoliday = holidays.find(holiday => {
//       // Convert holiday_date to a Date object if it's not already
//       const holidayDate = new Date(holiday.holiday_date);
//       // Compare holiday_date with date after converting both toDateString
//       return holidayDate.toDateString() === date.toDateString();

//   });

//   console.log("f",foundHoliday);
//     if(foundHoliday){

//       alert('its a holiday')
//       return;
//     }

//     if (date.getDay() === 0) {
//       return;
//     }

//     let newSelectedDates;

//     const dateIndex = selectedDates.findIndex(
//       (selectedDate) => selectedDate.toDateString() === date.toDateString()
//     );

//     if (dateIndex !== -1) {
//       // If already selected, remove the date
//       newSelectedDates = selectedDates.filter(
//         (selectedDate) => selectedDate.toDateString() !== date.toDateString()
//       );
//     } else {
//       // If not selected, add the date
//       // if (selectedDates.length >= 5) {
//       //   alert("You can only select up to 5 dates.");

//       //   return;
//       // }

//       // if (holidayDateIndex!==-1){

//       // }
//       if (selectedDates.length >= 5) {
//         toast.error('You can only select up to 5 dates.');
//         return;
//       }

//       newSelectedDates = [...selectedDates, date];
//     }

//     setSelectedDates(newSelectedDates);

//     setUser((prevUser) => ({ ...prevUser, selectedDate: newSelectedDates }));
//   };

//   const handleBookButtonClick = () => {
//     setBookings((prevBookings) => ({
//       ...prevBookings,
//       dates: [
//         ...prevBookings.dates,
//         ...selectedDates.map((selectedDate) => {
//           const year = selectedDate.getFullYear();
//           const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//           const day = String(selectedDate.getDate()).padStart(2, "0");
//           return `${year}/${month}/${day}`;
//         }),
//       ],
//     }));

//     console.log(bookings);
//     // Navigate to the /bookings page
//     navigate("/bookings");
//   };

//   const isAfter10AMToday = () => {
//     const currentDate = new Date();
//     return currentDate.getHours() >= 10;
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={10}>
//     <div style={{ backgroundColor: "white", height: "664px", width: "76.1vw" }}>
//       {loading ? (
//         <div>
//           {/* <div
//             style={{
//               flex: 0,
//               height: "5%",
//               width: "100vw",
//               backgroundColor: "#003A64",
//             }}
//           >
//             <marquee
//               behavior="scroll"
//               direction="left"
//               height="30px"
//               vspace="4"
//               style={{ color: "yellow", fontSize: "16px" }}
//             >
//               {newsTitles.map((title, index) => (
//                 <span style={{ paddingRight: 20, paddingLeft: 20 }} key={index}>
//                   {title}
//                   {index < newsTitles.length - 1}
//                 </span>
//               ))}
//             </marquee>
//           </div> */}
//           <div>
//             <div
//               style={{
//                 fontSize: "29px",
//                 fontFamily: "poppins",
//                 fontWeight: 600,
//                 marginLeft: "90px",
//                 paddingTop: "7px",
//                 color: "#0071BA",
//               }}
//             >
//               <span style={{ color: "#0071BA" }}>Plan </span>
//               <span>Your Day:</span>
//             </div>
//             <div className="calendar">
//               <Calendar
//                 onClickDay={handleDateClick}
//                 tileDisabled={({ date }) =>
//                 date < new Date(new Date().setHours(0, 0, 0, 0)) ||
//                 date.getDay() === 0 ||
//                 disabledDates.some((disabledDate) => new Date(disabledDate).toDateString() === date.toDateString()) ||
//                 (isAfter10AMToday() && date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString())
//               }
//                 tileClassName={({ date }) => {
//                   const isSunday = date.getDay() === 0;

//                   const isSaturday = !(date < new Date(new Date().setHours(0, 0, 0, 0))) &&
//                     (date.getDay() === 0 || date.getDay() === 6
//                     );

//                   const isBooked = disabledDates.some(
//                     (disabledDate) =>
//                       new Date(disabledDate).toDateString() === date.toDateString()
//                   );

//                   const isSelected = selectedDates.find(
//                     (selectedDate) =>
//                       selectedDate.toDateString() === date.toDateString()
//                   );

//                   const isHoliday = holidays.some(
//                     (holiday) => new Date(holiday.holiday_date).toDateString() === date.toDateString()
//                   );

//                   const isPreviousWeekend =
//                     date < new Date(new Date().setHours(0, 0, 0, 0)) &&
//                     (date.getDay() === 0 || date.getDay() === 6);

//                     return isBooked
//                     ? "booked"
//                     : isSelected
//                     ? "selected"
//                     : isSunday
//                     ? "sunday"
//                     : isSaturday
//                     ? "saturday"
//                     : isPreviousWeekend
//                     ? "previous-weekend"
//                     : isHoliday
//                     ? "holiday"
//                     : "";
//                 }}

//                 tileContent={({ date, view }) =>
//                 view === "month" && holidays.some((holiday) => new Date(holiday.holiday_date).toDateString() === date.toDateString())
//                   ? <div style={{ backgroundColor: "green", borderRadius: "50%", height: "10px", width: "10px", margin: "auto" }} />
//                   : null
//               }
//               />

//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{
//                   height: "2vw",
//                   width: "1.5vw",
//                   marginTop: "70px",
//                   marginLeft: "100px",
//                 }}
//                 onClick={handleBookButtonClick}
//               >
//                 Book
//               </Button>
//             </div>
//           </div>
//         </div>
//       ) : <Loading />}

//     </div>
//     </Grid>
//      <Grid item xs={12} md={2}>
//      {/* <div style={{ backgroundColor: "#F0F8FF", height: "664px", width: "100%" }}>
//        <CurrentBookings />
//      </div> */}
//      <button onClick={handleCurrentBookingsClick} style={{ textTransform: 'none', fontSize: '13px', fontWeight: 'bold', color: 'black', marginTop:'29vh', marginLeft:'14.2vw', height:'19vh', borderRadius:'20px', writingMode: 'vertical-rl',
//         textOrientation: 'mixed',  }}>

//           Current Bookings</button>

//      <Drawer
//             anchor="right"
//             open={currentBookingsOpen}
//             onClose={handleCloseCurrentBookings}
//             variant="persistent"

//           >
//             <div style={{ width: "415px", padding: "20px" }}>
//             <IconButton onClick={handleCloseCurrentBookings}>
//              <ChevronRightIcon />
//           </IconButton>
//               <Divider />
//               <CurrentBookings />
//             </div>
//           </Drawer>

//    </Grid>

//    <ToastContainer />
//  </Grid>
//   );
// };

// export default MultiDateCalendar;

import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import "./MultiDateCalendar.css";
import { useNavigate } from "react-router-dom";
import CurrentBookings from "./CurrentBookings";
import Grid from "@mui/material/Grid";
import api from "../api";
import Loading from "./Loading";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Bookings from "./Bookings";
import Swal from 'sweetalert2';


const MultiDateCalendar = ({
  selectedDates,
  setSelectedDates,
  user,
  setUser,
  bookings,
  setBookings,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [currentBookingsOpen, setCurrentBookingsOpen] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [selectedHolidayDate, setSelectedHolidayDate] = useState(null);
  const [showFoodPreferenceModal, setShowFoodPreferenceModal] = useState(false);
  const [foodPreference, setFoodPreference] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(
    Array(selectedDates.length).fill(null)
  );
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isdisabled, setDisabled] = useState(false);

  // console.log('selectedmeal,',selectedMeal);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dummyContainerRef = useRef(null);
  const [showDummyContainer, setShowDummyContainer] = useState(false);

  useEffect(() => {
    setSelectedDates([]);
    setBookings({
      dates: [],
      preference: [],
      isFoodRequired: false,
    });
  }, []);

  const fetchData = async () => {
    let response;
    try {
      response = await api.post("/user/getbookings", {
        isFoodRequired: true,
      });
      console.log("res", response);
      const dateBookedArray = response.data.map((item) => item.dateBooked);
      console.log("dates", dateBookedArray);
      setDisabledDates(dateBookedArray);
      setLoading(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchHolidays = async () => {
    let response;
    try {
      response = await api.get("/user/getholidaysofthisandupcomingyears");
      console.log("holiays", response.data.holidays);
      setHolidays(response.data.holidays);
    } catch (error) {
      console.log("error fetching holidays", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchHolidays();
  }, []);

  const handleCurrentBookingsClick = () => {
    setCurrentBookingsOpen(true);
  };

  const handleCloseCurrentBookings = () => {
    setCurrentBookingsOpen(false);
  };

  const handleDateClick = (date) => {
    console.log("click", date);
    const formattedDate = date.toISOString().split("T")[0];
    console.log("format", formattedDate);

    
    // const foundHoliday = holidays.find((holiday) => {
    //   const holidayDate = new Date(holiday.holiday_date);
    //   return holidayDate.toDateString() === date.toDateString();
    // });

    // if (foundHoliday) {
    //   setShowHolidayModal(true);
    //   setSelectedHolidayDate(date);
    //   return;
    // }
    if (date.getDay() === 0) {
      return;
    }

    let newSelectedDates;

    const dateIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (dateIndex !== -1) {
      newSelectedDates = selectedDates.filter(
        (selectedDate) => selectedDate.toDateString() !== date.toDateString()
      );
    } else {
      if (selectedDates.length >= 5) {
        toast.error("You can only select up to 5 dates.");
        return;
      }

      newSelectedDates = [...selectedDates, date];
    }

    setSelectedDates(newSelectedDates);

    // setBookings((prevBookings) => ({
    //   ...prevBookings,
    //   dates: newSelectedDates.map((selectedDate) => {
    //     const year = selectedDate.getFullYear();
    //     const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    //     const day = String(selectedDate.getDate()).padStart(2, "0");
    //     return `${year}/${month}/${day}`;
    //   }),
    // }));

    setUser((prevUser) => ({
      ...prevUser,
      selectedDate: newSelectedDates,
    }));
  };

  const handleBookButtonClick = () => {
    
    
    // const foundHoliday = holidays.find((holiday) => {
    //   const holidayDate = new Date(holiday.holiday_date);
    //   return holidayDate.toDateString() === selectedDates[0]?.toDateString();
    // });
  
    // if (foundHoliday) {
    //   setShowHolidayModal(true);
    //   setSelectedHolidayDate(selectedDates[0]);
    //   return;
    // }

    const hasHoliday = selectedDates.some((date) =>
    holidays.some(
      (holiday) =>
        new Date(holiday.holiday_date).toDateString() === date.toDateString()
    )
  );

  if (hasHoliday) {
    setShowHolidayModal(true);
    setSelectedHolidayDate(selectedDates[0]);
    return;
  }
    setOpen(true);
    setBookings((prevBookings) => ({
      ...prevBookings,
      dates: prevBookings.dates.concat(
        selectedDates.map((selectedDate) => {
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const day = String(selectedDate.getDate()).padStart(2, "0");
          return `${year}/${month}/${day}`;
        })
      ),
    }));
    console.log("bookings", bookings);
  };

  const isAfter10AMToday = () => {
    const currentDate = new Date();
    return currentDate.getHours() >= 10;
  };

  const handleClose = () => setOpen(false);

  const [selectedLunch, setSelectedLunch] = useState("");
  // const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const containsNonNullMeal = selectedMeal.some(
      (element) => element !== null
    );
    if (containsNonNullMeal) {
      setBookings((prevBookings) => ({
        ...prevBookings,
        isFoodRequired: true,
      }));
    }

    // const containsNonNullCab = selectedCab.some(element => element !== null);
    // if (containsNonNullCab) {
    //   setBookings((prevBookings) => ({
    //     ...prevBookings,
    //     isCabRequired: true
    //   }));

    // }
  }, [selectedMeal]);

  const handleLunchChange = (event) => {
    setSelectedLunch(event.target.value);

    setSelectedMeal(Array(selectedDates.length).fill(event.target.value));

    setBookings((prevBookings) => ({
      ...prevBookings,
      preference: Array(selectedDates.length).fill(event.target.value),
    }));
  };

  const handleSubmit = async () => {
    let response;

    try {
      setDisabled(true);
      response = await api.post("/user/bookings", {
        dates: bookings.dates,
        // deskId: bookings.deskId,
        preference: bookings.preference,
        // workSlot: bookings.workSlot,
        // isDeskRequired: bookings.isDeskRequired,
        // isCabRequired: bookings.isCabRequired,
        isFoodRequired: bookings.isFoodRequired,
        // Add other properties as needed
      });

      console.log(response);
      // setSubmissionStatus("success");
      setOpen(false);
      setDisabled(false);
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your booking has been done successfully!",
      });
    } catch (err) {
      console.log("error in the final submission", err);
      // setSubmissionStatus("error");
      setErrorMessage(err.response.data.message);
      setOpen(false);
      setDisabled(false);
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: errorMessage || 'An error occurred while processing your booking.',
      });
    }
  };
  const handleHolidayModalClose = () => {
    setShowHolidayModal(false);
    setSelectedDates([]);
  };

  // const handleProceedHoliday = () => {
  //   setShowHolidayModal(false);
  //   setSelectedDates((prevSelectedDates) => [
  //     ...prevSelectedDates,
  //     selectedHolidayDate,
  //   ]);
  //   console.log(selectedDates);
  //   handleBookButtonClick();
  // };
  const handleProceedHoliday = () => {
    setShowHolidayModal(false);  
    setOpen(true);
    setBookings((prevBookings) => ({
      ...prevBookings,
      dates: [...prevBookings.dates, ...selectedDates.map((selectedDate) => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
      })],
    }));
    console.log("bookings", bookings);
  };
  
  // useEffect(() => {
  //   // // Check if all preferences are selected
  //   // if (selectedCab.every(slot => slot !== '') && selectedLunch !== '') {
  //   //   console.log("Updating bookings with:", selectedCab, selectedLunch);
  //   //   // Update the bookings state
  //   //   setBookings((prevBookings) => {
  //   //     const newBookings = { ...prevBookings };
  //   //     newBookings.workSlot = [...selectedCab];
  //   //     newBookings.preference = selectedLunch;
  //   //     return newBookings;
  //   //   });
  //   // }
  //   // setBookings((prevBookings) => ({
  //   //     ...prevBookings,
  //   //     workSlot: Array(selectedDates.length).fill(selectedSlot),
  //   //   }));
  //   setBookings((prevBookings) => ({
  //     ...prevBookings,
  //     preference: selectedMeal,
  //   }));

  // }, [selectedLunch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <div
          style={{
            backgroundColor: "white",
            height: "25px",
            width: "30vw",
          }}
        >
          {loading ? (
            <div>
              <div>
                {/* <div
                  style={{
                    fontSize: "29px",
                    fontFamily: "poppins",
                    fontWeight: 600,
                    marginLeft: "178px",
                    paddingTop: "83px",
                    color: "#0071BA",
                  }}
                >
                  <span style={{ color: "#0071BA" }}>Plan </span>
                  <span>Your Day:</span>
                </div> */}
                <div className="calendar">
                  <Calendar
                    onClickDay={handleDateClick}
                    tileDisabled={({ date }) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 ||
                      disabledDates.some(
                        (disabledDate) =>
                          new Date(disabledDate).toDateString() ===
                          date.toDateString()
                      ) ||
                      (isAfter10AMToday() &&
                        date.toDateString() ===
                          new Date(
                            new Date().setDate(new Date().getDate() + 1)
                          ).toDateString())
                    }
                    tileClassName={({ date }) => {
                      const isSunday = date.getDay() === 0;
                      const isSaturday =
                        !(date < new Date(new Date().setHours(0, 0, 0, 0))) &&
                        (date.getDay() === 0 || date.getDay() === 6);

                      const isBooked = disabledDates.some(
                        (disabledDate) =>
                          new Date(disabledDate).toDateString() ===
                          date.toDateString()
                      );

                      const isSelected = selectedDates.find(
                        (selectedDate) =>
                          selectedDate.toDateString() === date.toDateString()
                      );

                      const isHoliday = holidays.some(
                        (holiday) =>
                          new Date(holiday.holiday_date).toDateString() ===
                          date.toDateString()
                      );

                      const isPreviousWeekend =
                        date < new Date(new Date().setHours(0, 0, 0, 0)) &&
                        (date.getDay() === 0 || date.getDay() === 6);

                      return isBooked
                        ? "booked"
                        : isSelected
                        ? "selected"
                        : isSunday
                        ? "sunday"
                        : isSaturday
                        ? "saturday"
                        : isPreviousWeekend
                        ? "previous-weekend"
                        : isHoliday
                        ? "holiday"
                        : "";
                    }}
                    tileContent={({ date, view }) =>
                      view === "month" &&
                      holidays.some(
                        (holiday) =>
                          new Date(holiday.holiday_date).toDateString() ===
                          date.toDateString()
                      ) ? (
                        <div
                          style={{
                            backgroundColor: "green",
                            borderRadius: "50%",
                            height: "10px",
                            width: "10px",
                            margin: "auto",
                          }}
                        />
                      ) : null
                    }
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      height: "2.5vw",
                      width: "9vw",
                      marginTop: "45px",
                      marginLeft: "288px",
                    }}
                    onClick={handleBookButtonClick}
                  >
                    Book
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    // style={{width:'343px',height:'186px'}}
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Book Your Lunch
                      </Typography>
                      <Divider style={{ width: "350px" }} />
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        preference:
                      </Typography>
                      <RadioGroup
                        aria-label="lunch-type"
                        name="lunch-type"
                        value={selectedLunch}
                        onChange={handleLunchChange}
                        style={{
                          flexDirection: "row",
                          paddingLeft: "10px",
                          color: "#666C7E",
                          fontWeight: 500,
                          fontSize: "1px",
                          lineHeight: "16px",
                        }}
                        // value={selectedPreferences[index] || ""}
                        //   onChange={(event) => handleLunchChange(event, index)}
                        // row
                      >
                        <FormControlLabel
                          value="Veg"
                          control={<Radio />}
                          label="Veg"
                          style={{ fontFamily: "poppins" }}
                        />
                        <FormControlLabel
                          value="Non-Veg"
                          control={<Radio />}
                          label="Non-Veg"
                          style={{ fontFamily: "poppins ", fontSize: "14px" }}
                        />
                        <FormControlLabel
                          value="None"
                          control={<Radio />}
                          style={{ fontFamily: "poppins", fontSize: "14px" }}
                          label="none"
                        />
                      </RadioGroup>

                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        style={{ width: "20px" }}
                        disabled={isdisabled}
                      >
                        Submit
                      </Button>
                      {submissionStatus === "success" && (
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: "50px",
                            color: "green",
                            marginLeft: "30px",
                          }}
                        >
                          All bookings has been done successfully!!!
                        </Typography>
                      )}

                      {submissionStatus === "error" && (
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: "50px",
                            color: "red",
                            marginLeft: "30px",
                          }}
                        >
                          {errorMessage}
                        </Typography>
                      )}
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </Grid>
      <Modal
        open={showHolidayModal}
        onClose={handleHolidayModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={showHolidayModal}>
          <Box
            sx={{
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              padding: 4,
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              Confirm Holiday Booking
            </Typography>
            <Typography variant="body1" gutterBottom>
              You have selected a holiday. Do you want to proceed with the
              booking?
            </Typography>
            <Button variant="contained" onClick={handleProceedHoliday} style={{backgroundColor:'green'}}>
              Yes, Book on Holiday
            </Button>
            <Button variant="contained" onClick={handleHolidayModalClose} style={{marginLeft:'10px', backgroundColor:'red'}}>
              No, Cancel Booking
            </Button>
          </Box>
        </Fade>
      </Modal>
      {/* <Grid item xs={12} md={2}>
        <button
          onClick={handleCurrentBookingsClick}
          style={{
            textTransform: "none",
            fontSize: "13px",
            fontWeight: "bold",
            color: "black",
            marginTop: "29vh",
            marginLeft: "14.2vw",
            height: "19vh",
            borderRadius: "20px",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Current Bookings
        </button>
        <Drawer
          anchor="right"
          open={currentBookingsOpen}
          onClose={handleCloseCurrentBookings}
          variant="persistent"

        >
          <div style={{ width: "800px", padding: "20px" }}>
            <IconButton onClick={handleCloseCurrentBookings}>
              <ChevronRightIcon />
            </IconButton>
            <Divider />
            <CurrentBookings />
          </div>
        </Drawer>
      </Grid> */}
    </Grid>
  );
};

export default MultiDateCalendar;
