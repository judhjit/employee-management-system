import React from 'react';
import backgroundImg from '../assets/cab3.png';
import './CabBooking.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CurrentBookings from './CurrentBookings';

const CabBooking = () => {
    const [time, setTime] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    
    <div className="cab-booking-container">
      <img src={backgroundImg} alt="banner" className='bg-img'/>
      <div className="content" >
        <h1 style={{paddingLeft:"90px"}}>
          <span style={{ color: "#0071BA" }}>Book</span>
          <span> Your Cab</span>
        </h1>

        <div style={{paddingLeft:"95px" }}>
        <Button sx={{ display: 'block', mt: 7 }} onClick={handleOpen}>
        Select your time slots
      </Button>
      
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-controlled-open-select-label">Slots</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={time}
          label="Slots"
          onChange={handleChange}
        >
          
          <MenuItem value={9}>9:00am-5:00pm</MenuItem>
          <MenuItem value={5}>5:00am-2:00pm</MenuItem>
          <MenuItem value={6}>6:00am-3:00pm</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div direction="row" style={{align:"right",display:"flex",marginRight: "10px",height:"2vw" }} className='skipnext'>
        <Button variant="contained" style={{marginRight:"20px",width:"4vw"}}>Skip</Button>
        <Button variant="contained" style={{width:"4vw"}}>Next</Button>
      </div>
      </div>
      
    </div>
    
    
  );
};

export default CabBooking;
