
// import {useState} from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// const LunchAndCabbook = () => {
//     const [selectedSlot, setSelectedSlot] = useState('Morning');
//     const [selectedLunch, setSelectedLunch] = useState('Veg');
  
//     const handleSlotChange = (event) => {
//       setSelectedSlot(event.target.value);
//     };
  
//     const handleLunchChange = (event) => {
//       setSelectedLunch(event.target.value);
//     };
//   return (
//     <div className="container">
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <div className="cab-booking">
//             <Typography variant="h5">Cab Booking</Typography>
//             <FormControl>
//               <Select
//                 value={selectedSlot}
//                 onChange={handleSlotChange}
//                 displayEmpty
//                 className="select">
//                 <MenuItem value="Morning">Morning</MenuItem>
//                 <MenuItem value="Afternoon">Afternoon</MenuItem>
//                 <MenuItem value="Evening">Evening</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </Grid>
//         <Grid item xs={6}>
//           <div className="lunch-booking">
//             <Typography variant="h5">Lunch Booking</Typography>
//             <RadioGroup
//               aria-label="lunch-type"
//               name="lunch-type"
//               value={selectedLunch}
//               onChange={handleLunchChange}
//               row>
//               <FormControlLabel
//                 value="Veg"
//                 control={<Radio />}
//                 label="Veg"
//               />
//               <FormControlLabel
//                 value="NonVeg"
//                 control={<Radio />}
//                 label="Non-Veg"
//               />
//             </RadioGroup>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

// export default LunchAndCabbook


import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import lunchImg from '../assets/lunch 1.png';
import './LunchAndCabbook.css';
import cabMap from '../assets/cabbook.png';
import { Button } from '@mui/material';

const LunchAndCabbook = ({selectedDates}) => {
  const [selectedSlot, setSelectedSlot] = useState('Morning');
  const [selectedLunch, setSelectedLunch] = useState('Veg');
  const [active, setActive] = useState([]);
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
    if (!selectAllDates) {
      const allIndices = selectedDates.map((_, index) => index);
      setActive(allIndices);
    } else {
      setActive([]);
    }
    setSelectAllDates(!selectAllDates);
  };

  return (
    <div>
      
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '30vw', padding: '5%' }}>
        {selectedDates.map((d, index) => (
          <div key={index} style={{paddingRight:'20px'}}>
            <Button
              variant="contained"
              onClick={() => handleBooking(index)}
              color={active.includes(index) ? 'success' : 'primary'} // Change color based on active state
              
            >
              {d.toDateString()}
            </Button>
          </div>
        ))}
        <FormControlLabel
          control={
            <Radio
              color="primary"
              checked={selectAllDates}
              onChange={handleSelectAllDates}
            />
          }
          label="Select All"
        />
      </div>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} stle={{paddingLeft:'10px'}}>
            <div className="lunch-booking">
              <Typography variant="h5" style={{textAlign:'left',paddingTop:'20px',fontSize:'30px'}}>
                <span style={{ color: '#0071BA' }}>Book </span>
                <span>Your Lunch!</span>
              </Typography>
              <div>
                <h4 style={{textAlign:'left',paddingTop:'20px',fontSize:'20px'}}>Preference:</h4>
              </div>
              <div style={{paddingLeft:'140px'}}>
              <RadioGroup
                aria-label="lunch-type"
                name="lunch-type"
                value={selectedLunch}
                onChange={handleLunchChange}
                row
                
              >
                <FormControlLabel
                  value="Veg"
                  control={<Radio />}
                  label="Veg"
                />
                <FormControlLabel
                  value="NonVeg"
                  control={<Radio />}
                  label="Non-Veg"
                />
                <FormControlLabel
                  value=""
                  control={<Radio />}
                  label="none"
                />
              </RadioGroup>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="cab-booking">
            <Typography variant="h5" style={{textAlign:'left',paddingTop:'20px',fontSize:'30px'}}>
                <span >Book Your</span>
                <span style={{ color: '#0071BA' }}> Cab!</span>
              </Typography>
              <div>
                <h4 style={{textAlign:'left',paddingTop:'20px',fontSize:'20px'}}>Book Your Slot:</h4>
              </div>
              <FormControl style={{ paddingLeft: '25px', paddingTop: '15px' }}>
                <Select
                  value={selectedSlot}
                  onChange={handleSlotChange}
                  displayEmpty
                  className="select"
                  style={{width:'12vw'}}
                >
                  <MenuItem value="9:00am-5:00pm" >9:00am-5:00pm</MenuItem>
                  <MenuItem value="5:00am-2:00pm">5:00am-2:00pm</MenuItem>
                  <MenuItem value="6:00am-3:00pm">6:00am-3:00pm</MenuItem>
                  <MenuItem value="">none</MenuItem>
                 
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </div>
      <Button variant='contained' style={{left:'1000px',top:'15px'}}>Submit</Button>
      <img src={cabMap} className='cab-map'></img>
    </div>
  );
};

export default LunchAndCabbook;