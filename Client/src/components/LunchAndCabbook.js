
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./LunchAndCabbook.css";
import { Divider } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LunchAndCabbook({selectedDates}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSlot, setSelectedSlot] = useState("Morning");
  const [selectedLunch, setSelectedLunch] = useState("Veg");
  const [active, setActive] = useState(0);
  const [selectAllDates, setSelectAllDates] = useState(false);

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleLunchChange = (event) => {
    setSelectedLunch(event.target.value);
  };

  const handleBooking = (index) => {
    const updatedActive = [...active];
    if (updatedActive.includes(index)) {
      updatedActive.splice(updatedActive.indexOf(index), 1);
    } else {
      updatedActive.push(index);
    }
    setActive(updatedActive);
  };

  const handleSelectAllDates = () => {
    setSelectAllDates(!selectAllDates);
    if (!selectAllDates) {
      const allIndices = selectedDates.map((_, index) => index);
      setActive(allIndices);
    } else {
      setActive([]);
    }
  };


  const handleActiveStatus=(index)=>{
    setActive(index);
  };

  
  return (
    <Box sx={{ width:'70%', fontFamily: "poppins" }}>
      <div style={{position:"absolute",backgroundColor:'#F6F6F6',height:'80vh',width:'71vw',marginLeft:'42px'}}>
      <Box sx={{ paddingBottom: "30px", paddingLeft: "120px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          
         
        >
          <Tab label="Select Single Dates" {...a11yProps(0)} 
           sx={{ '&:hover': { backgroundColor: 'transparent' } }}/>
          <Tab label="Select Multpile Dates" {...a11yProps(1)} 
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <div style={{display:'flex',marginLeft:'80px'}}>
          {
            selectedDates.map((d,index)=>(
              <div key={index}>
                <Button variant="contained"
                onClick={()=> handleActiveStatus(index)}
                style={{ paddingLeft: '100px', marginBottom: '10px',
                marginLeft:'30px',display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'11px 20px',borderRadius:'54px',border:'1px solid #D6D6D6', 
              fontSize:'13px',fontFamily:'poppins',lineHeight:'15px',
            width:'170px',fontWeight:500,
            color: index === active ? '#FFF' : '#000', 
            backgroundColor: index === active ? '#0071BA' : 'transparent', 
            marginBottom:'30px'
           }}
                color={index === active ? 'primary' : 'grey'}>
                  {d.toDateString()}
                </Button>
                </div>
            ))
          }

        </div>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
                row
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
          <Button  variant='contained' style={{marginTop: "70px", width: "200px", marginTop:'350px'}}>
          Submit{" "}
        </Button>
        </Box>
        {/* <Button
          variant="contained"
          style={{ marginLeft: "650px", marginTop: "70px", width: "200px" }}
        >
          Submit{" "}
        </Button> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} >
      <div style={{display:'flex',flexDirection:'column'}}>

      
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
                row
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
                  style={{  width: "200px" }}
                >
                  <MenuItem value="9:00am-5:00pm">9:00am-5:00pm</MenuItem>
                  <MenuItem value="5:00am-2:00pm">5:00am-2:00pm</MenuItem>
                  <MenuItem value="6:00am-3:00pm">6:00am-3:00pm</MenuItem>
                  <MenuItem value="">none</MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          </Card>
          <Button  variant='contained' style={{marginTop: "70px", width: "200px", marginTop:'350px'}}>
          Submit{" "}
        </Button>
        </Box>
        
        </div>
      </CustomTabPanel>
      </div>
    </Box>
  );
}
