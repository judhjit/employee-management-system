import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import api from "../api";

const Review = ({ bookings, setBookings }) => {
  console.log("bookings in review page", bookings);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  useEffect(() => {
    const containsNonNullPreference = bookings.preference.some(
      (element) => element !== "None"
    );
    const containsNonNullworkSlot = bookings.workSlot.some(
      (element) => element !== "None"
    );
    if (containsNonNullPreference) {
      setBookings((prevBookings) => ({
        ...prevBookings,
        isFoodRequired: true,
      }));
    }
    if (containsNonNullworkSlot) {
      setBookings((prevBookings) => ({
        ...prevBookings,
        isCabRequired: true,
      }));
    }
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await api.post("/user/bookings", {
        dates: bookings.dates,
        deskId: bookings.deskId,
        preference: bookings.preference,
        workSlot: bookings.workSlot,
        isDeskRequired: bookings.isDeskRequired,
        isCabRequired: bookings.isCabRequired,
        isFoodRequired: bookings.isFoodRequired,
        // Add other properties as needed
      });

      console.log(response);
      setSubmissionStatus("success");
    } catch (err) {
      console.log("error in the final submission", err);
      setSubmissionStatus("error");
    }
  };

  return (
    <Card
      sx={{
        position: "absolute",
        backgroundColor: "rgb(246, 246, 246)",
        height: "80vh",
        width: "71vw",
        marginLeft: "42px",
        marginTop: "-68px",
        zIndex: "0",
        
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "40px",
          overflowX: "auto",
          marginLeft: "50px",
          marginTop: "100px",
        }}
      >
        {bookings.dates.map((date, index) => (
          <Card
            key={index}
            sx={{
              flex: "0 0 auto",
              width: "300px",
              backgroundColor: "#F0F0F0", // Adjust the shade of white as needed
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "10px" }}
              >
                {date}
              </Typography>
              <ul>
                <li>
                  <strong>Desk ID:</strong> {bookings.deskId[index]}
                </li>
                <li>
                  <strong>Preference:</strong> {bookings.preference[index]}
                </li>
                <li>
                  <strong>Work Slot:</strong> {bookings.workSlot[index]}
                </li>
                {/* Add additional information if needed */}
              </ul>
            </CardContent>
          </Card>
        ))}
        

       
       
      
      </Box>
      <Button style={{marginTop:'40px', marginLeft:'30px'}} onClick={handleSubmit}>Submit</Button>
      {submissionStatus === "success" && (
          <Typography variant="h6" sx={{ marginTop: "50px", color: "green", marginLeft:'30px'}}>
            All bookings has been done successfully!!!
          </Typography>
        )}

     
        {submissionStatus === "error" && (
          <Typography variant="h6" sx={{ marginTop: "50px", color: "red", marginLeft:'30px' }}>
            Error in booking. Please try again.
          </Typography>
        )}
    </Card>
  );
};

export default Review;
