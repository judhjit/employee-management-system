import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Alert from '@mui/material/Alert';
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-calendar/dist/Calendar.css";
import "./MultiDateCalendar.css";
import { useNavigate } from "react-router-dom";
import CurrentBookings from "./CurrentBookings";
import Grid from '@mui/material/Grid';
import api from "../api";
import Loading from './Loading';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';

const MultiDateCalendar = ({
  // showNewsFeed,
  selectedDates,
  setSelectedDates,
  user,
  setUser,
  isUser,
  bookings,
  setBookings,
  // socket,
}) => {
  const navigate = useNavigate();
  // const [newsTitles, setNewsTitles] = useState([]);
  // const [errorMessage,setErrorMessage]=useState(null);
  const [loading, setLoading] = useState(false);

  const [disabledDates, setDisabledDates] = useState([]);
  const [currentBookingsOpen, setCurrentBookingsOpen] = useState(false);

  useEffect(() => {
    // fetchNewsTitles();
    // socket.on("newsfeed:refresh", fetchNewsTitles);

    setSelectedDates([]);
    setBookings({
      dates: [],
      // deskId: [],
      // workSlot: [],
      preference: [],
      // isDeskRequired: true,
      // isCabRequired: false,
      isFoodRequired: false,
    });
  }, []);

  const fetchData = async () => {
    let response;
    try {
      response = await api.post("/user/getbookings", {
        // isDeskRequired: true,
        // isCabRequired: true,
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleCurrentBookingsClick = () => {
    setCurrentBookingsOpen(true);
  };

  const handleCloseCurrentBookings = () => {
    setCurrentBookingsOpen(false);
  };

  const handleDateClick = (date) => {
    console.log(date);
    if (date.getDay() === 0) {
      return;
    }


    let newSelectedDates;

    const dateIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (dateIndex !== -1) {
      // If already selected, remove the date
      newSelectedDates = selectedDates.filter(
        (selectedDate) => selectedDate.toDateString() !== date.toDateString()
      );
    } else {
      // If not selected, add the date
      // if (selectedDates.length >= 5) {
      //   alert("You can only select up to 5 dates.");

      //   return;
      // }
      if (selectedDates.length >= 5) {
        toast.error('You can only select up to 5 dates.');
        return;
      }

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
        ...selectedDates.map((selectedDate) => {
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const day = String(selectedDate.getDate()).padStart(2, "0");
          return `${year}/${month}/${day}`;
        }),
      ],
    }));

    console.log(bookings);
    // Navigate to the /bookings page
    navigate("/bookings");
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
    <div style={{ backgroundColor: "white", height: "664px", width: "76.1vw" }}>
      {loading ? (
        <div>
          {/* <div
            style={{
              flex: 0,
              height: "5%",
              width: "100vw",
              backgroundColor: "#003A64",
            }}
          >
            <marquee
              behavior="scroll"
              direction="left"
              height="30px"
              vspace="4"
              style={{ color: "yellow", fontSize: "16px" }}
            >
              {newsTitles.map((title, index) => (
                <span style={{ paddingRight: 20, paddingLeft: 20 }} key={index}>
                  {title}
                  {index < newsTitles.length - 1}
                </span>
              ))}
            </marquee>
          </div> */}
          <div>
            <div
              style={{
                fontSize: "29px",
                fontFamily: "poppins",
                fontWeight: 600,
                marginLeft: "90px",
                paddingTop: "7px",
                color: "#0071BA",
              }}
            >
              <span style={{ color: "#0071BA" }}>Plan </span>
              <span>Your Day:</span>
            </div>
            <div className="calendar">
              <Calendar
                onClickDay={handleDateClick}
                tileDisabled={({ date }) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  date.getDay() === 0 ||
                  disabledDates.some(disabledDate => new Date(disabledDate).toDateString() === date.toDateString())
                }
                tileClassName={({ date }) => {
                  const isSunday = date.getDay() === 0;

                  const isSaturday = !(date < new Date(new Date().setHours(0, 0, 0, 0))) &&
                    (date.getDay() === 0 || date.getDay() === 6
                    );

                  const isBooked = disabledDates.some(
                    (disabledDate) =>
                      new Date(disabledDate).toDateString() === date.toDateString()
                  );

                  const isSelected = selectedDates.find(
                    (selectedDate) =>
                      selectedDate.toDateString() === date.toDateString()
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
                            : "";
                }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{
                  height: "2vw",
                  width: "1.5vw",
                  marginTop: "70px",
                  marginLeft: "100px",
                }}
                onClick={handleBookButtonClick}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      ) : <Loading />}

    </div>
    </Grid>
     <Grid item xs={12} md={2}>
     {/* <div style={{ backgroundColor: "#F0F8FF", height: "664px", width: "100%" }}>
       <CurrentBookings />
     </div> */}
     <button onClick={handleCurrentBookingsClick} style={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold', color: 'black', marginTop:'20vh', marginLeft:'12vw', height:'40vh', borderRadius:'6px', writingMode: 'vertical-rl',
        textOrientation: 'mixed',  }}>Current Bookings</button>
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

   </Grid>

   <ToastContainer />
 </Grid>
  );
};

export default MultiDateCalendar;