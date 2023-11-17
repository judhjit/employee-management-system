

import React, { useState } from 'react';
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

const LunchAndCabForm = ({ setSelectedMeal,setSelectedCab ,selectedMeal,selectedCab}) => {
    const [selectedLunch, setSelectedLunch] = useState("   ");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleLunchChange = (event) => {
    setSelectedLunch(event.target.value);
    setSelectedMeal(selectedMeal.fill(event.target.value))
    console.log(selectedMeal)
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setSelectedCab(selectedCab.fill(event.target.value))
    console.log(selectedCab)
  };

  
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
                  value="NonVeg"
                  control={<Radio />}
                  label="Non-Veg"
                  style={{ fontFamily: "poppins ", fontSize: "14px" }}
                />
                <FormControlLabel
                  value=""
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
                  <MenuItem value="9:00am-5:00pm">9:00am-5:00pm</MenuItem>
                  <MenuItem value="5:00am-2:00pm">5:00am-2:00pm</MenuItem>
                  <MenuItem value="6:00am-3:00pm">6:00am-3:00pm</MenuItem>
                  <MenuItem value="">none</MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          </Card>
    </div>
  )
}

export default LunchAndCabForm;