import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, CardActions } from '@mui/material';

const LunchAndCabFormAll = ({ setSelectedMeal, selectedMeal, bookings, setBookings, selectedDates }) => {
  const [selectedLunch, setSelectedLunch] = useState("   ");
  // const [selectedSlot, setSelectedSlot] = useState("");

  const handleLunchChange = (event) => {
    setSelectedLunch(event.target.value);
    setSelectedMeal(selectedMeal.fill(event.target.value))
    // setBookings((prevBookings) => ({
    //     ...prevBookings,
    //     preference: selectedMeal,
    //   }));
    console.log(selectedMeal)
  };

  // const handleSlotChange = (event) => {
  //   setSelectedSlot(event.target.value);
  //   setSelectedCab(selectedCab.fill(event.target.value))
  //   // setBookings((prevBookings) => ({
  //   //     ...prevBookings,
  //   //     workSlot: Array(selectedDates.length).fill(selectedSlot),
  //   //   }));
  //   console.log(selectedCab)
  // };

  useEffect(() => {
    // // Check if all preferences are selected
    // if (selectedCab.every(slot => slot !== '') && selectedLunch !== '') {
    //   console.log("Updating bookings with:", selectedCab, selectedLunch);
    //   // Update the bookings state
    //   setBookings((prevBookings) => {
    //     const newBookings = { ...prevBookings };
    //     newBookings.workSlot = [...selectedCab];
    //     newBookings.preference = selectedLunch;
    //     return newBookings;
    //   });
    // }
    // setBookings((prevBookings) => ({
    //     ...prevBookings,
    //     workSlot: Array(selectedDates.length).fill(selectedSlot),
    //   }));
    setBookings((prevBookings) => ({
      ...prevBookings,
      preference: selectedMeal,
    }));

  }, [selectedLunch]);

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <Card
        sx={{
          minWidth: 10,
          width: "333px",
          height: "283px",
          borderRadius: "15px",
          border: 0,
          backgroundColor: "#F1F1F1 !important",
          marginLeft: "110px",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography
            style={{
              textAlign: "left",
              paddingTop: "12px",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "poppins",
              paddingBottom: "20px",
            }}
          >
            <span style={{ color: "#0071BA" }}>Book </span>
            <span>Your Lunch!</span>
          </Typography>

          <Divider
            style={{ width: "285px", height: "0px", opacity: 0.3 }}
          />

          <div>
            <p
              style={{
                textAlign: "left",
                paddingTop: "20px",
                fontSize: "16px",
                lineHeight: "16px",
                color: "#232323",
                marginBottom: "-19px",
              }}
            >
              Preference:
            </p>
          </div>
        </CardContent>
        <CardActions>
          <RadioGroup
            aria-label="lunch-type"
            name="lunch-type"
            value={selectedLunch}
            onChange={handleLunchChange}
            style={{
              flexDirection: "column",
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
        </CardActions>
      </Card>
    </div>
  )
}

export default LunchAndCabFormAll;