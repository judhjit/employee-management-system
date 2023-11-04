
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const LunchAndCabbook = () => {
    const [selectedSlot, setSelectedSlot] = useState('Morning');
    const [selectedLunch, setSelectedLunch] = useState('Veg');
  
    const handleSlotChange = (event) => {
      setSelectedSlot(event.target.value);
    };
  
    const handleLunchChange = (event) => {
      setSelectedLunch(event.target.value);
    };
  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="cab-booking">
            <Typography variant="h5">Cab Booking</Typography>
            <FormControl>
              <Select
                value={selectedSlot}
                onChange={handleSlotChange}
                displayEmpty
                className="select">
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="lunch-booking">
            <Typography variant="h5">Lunch Booking</Typography>
            <RadioGroup
              aria-label="lunch-type"
              name="lunch-type"
              value={selectedLunch}
              onChange={handleLunchChange}
              row>
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
            </RadioGroup>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default LunchAndCabbook