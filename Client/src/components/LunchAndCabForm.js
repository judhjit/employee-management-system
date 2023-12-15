// import React, { useState,useEffect } from 'react';
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { Box, CardActions } from '@mui/material';

// const LunchAndCabForm = ({ active,setSelectedMeal,setSelectedCab ,selectedMeal,selectedCab,bookings,setBookings}) => {
//     const[activeLunch,setActiveLunch]=useState(selectedMeal[active]);
//     const [preferences, setPreferences] = useState(Array(selectedMeal.length).fill(''));
//     const [selectedSlot, setSelectedSlot] = useState('');
//     console.log(selectedCab);
//     console.log(selectedMeal);

    
   
//     const handleLunchChange = (event) => {
//       const value = event.target.value;
//       setActiveLunch(value);
  
//       setPreferences((prevPreferences) => {
//         const newPreferences = [...prevPreferences];
//         newPreferences[active] = value;
//         return newPreferences;
//       });
//     };
  
//     const handleSlotChange = (event) => {
//       const value = event.target.value;
//       setSelectedSlot(value);
  
//       setSelectedCab((prevSlots) => {
//         const newSlots = [...prevSlots];
//         newSlots[active] = value;
//         return newSlots;
//       });
//     };
  
//     useEffect(() => {
//       setSelectedMeal((prevArray) => {
//         const newArray = [...prevArray];
//         newArray[active] = activeLunch;
//         return newArray;
//       });
//     }, [activeLunch, active, setSelectedMeal]);
  
//     useEffect(() => {
//       // Check if all preferences and slots are selected
//       if (preferences.every(preference => preference !== '') && selectedCab.every(slot => slot !== '')) {
//         // Update the bookings state
//         setBookings((prevBookings) => {
//           const newBookings = { ...prevBookings };
//           newBookings.preference = [...preferences];
//           newBookings.workSlot = [...selectedCab];
//           return newBookings;
//         });
//       }
//     }, [preferences, selectedCab, setBookings]);
   
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
import { CardActions } from '@mui/material';

const LunchAndCabForm = ({ active, setSelectedMeal, setSelectedCab, selectedMeal, selectedCab, bookings, setBookings }) => {
  const [activeLunch, setActiveLunch] = useState(selectedMeal[active]);
  const [preferences, setPreferences] = useState(Array(selectedMeal.length).fill(''));
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleLunchChange = (event) => {
    const value = event.target.value;
    setActiveLunch(value);

    setPreferences((prevPreferences) => {
      const newPreferences = [...prevPreferences];
      newPreferences[active] = value;
      return newPreferences;
    });
  };

  const handleSlotChange = (event) => {
    const value = event.target.value;
    setSelectedSlot(value);

    setSelectedCab((prevSlots) => {
      const newSlots = [...prevSlots];
      newSlots[active] = value;
      return newSlots;
    });
  };

  
  useEffect(() => {
    if (preferences[active]) {
      setActiveLunch(preferences[active]);
      console.log("active lunch", selectedMeal[active])
    }
    else{
      setActiveLunch(null)
    }
    if (selectedCab[active])
      setSelectedSlot(selectedCab[active]);
    else
    setSelectedSlot(null)

  }, [active]);

  useEffect(() => {
    setSelectedMeal((prevArray) => {
      const newArray = [...prevArray];
      newArray[active] = activeLunch;
      return newArray;
    });
  }, [activeLunch, active, setSelectedMeal]);

  useEffect(() => {
    
    if (preferences.every(preference => preference !== '') && selectedCab.every(slot => slot !== '')) {
      
      setBookings((prevBookings) => {
        const newBookings = { ...prevBookings };
        newBookings.preference = [...preferences];
        newBookings.workSlot = [...selectedCab];
        return newBookings;
      });
    }
  }, [preferences, selectedCab, setBookings]);

  
  

  
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Card
            sx={{
              minWidth: 10,
              width: "333px",
              height: "283px",
              borderRadius: "15px",
              border:0,
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
                value={activeLunch}
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
          <Card
            sx={{
              minWidth: 10,
              width: "333px",
              height: "283px",
              borderRadius: "15px",
              border: 0,
              backgroundColor: "#F1F1F1 !important",
              marginLeft: "20px",
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
                <span>Your Cab!</span>
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
                  Select Slot:
                </p>
              </div>
            </CardContent>
            <CardActions>
              <FormControl style={{ paddingLeft: "25px", paddingTop: "1px" }}>
                <Select
                  value={selectedSlot}
                  onChange={handleSlotChange}
                  displayEmpty
                  className="select"
                  style={{ width: "200px" }}
                >
                  <MenuItem value="9:00AM-5:00PM">9:00AM-5:00PM</MenuItem>
                  <MenuItem value="5:00AM-2:00PM">5:00AM-2:00PM</MenuItem>
                  <MenuItem value="6:00AM-3:00PM">6:00AM-3:00PM</MenuItem>
                  <MenuItem value="None">none</MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          </Card>
    </div>
  )
}

export default LunchAndCabForm;