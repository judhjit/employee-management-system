import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Form.css';

const steps = ['Desk Booking', 'Cab Booking', 'Lunch Booking', 'Review'];

const Timeline = ({ selectedDates }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [lunchPreference, setLunchPreference] = useState('');
  const [cabTiming, setCabTiming] = useState('');
  const [reviewData, setReviewData] = useState({});
  const [active, setActive] = useState([]); // To Track booked dates
  const [bookings, setBookings] = useState([]); // To Store booking data for each date
  const [selectAll, setSelectAll] = useState(false);

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBooking = (index) => {
    const updatedActive = [...active];
    if (updatedActive.includes(index)) {
      updatedActive.splice(updatedActive.indexOf(index), 1);
    } else {
      updatedActive.push(index);
    }
    setActive(updatedActive);
    setActiveStep(0); // To Reset the timeline to the first step when a date is selected
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setActive([]);
    } else {
      setActive([...Array(selectedDates.length).keys()]);
    }
    setSelectAll(!selectAll);
  };

  

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 2) {
      setReviewData({ ...reviewData, lunchPreference, cabTiming });
    }

    if (activeStep === steps.length - 1) {
      // To Handle finishing a booking
      if (active.length === 0) {
        // If No date selected, reset everything
        setActiveStep(0);
        setLunchPreference('');
        setCabTiming('');
        setReviewData({});
        setBookings([]); // To Clear all bookings
        setSelectAll(false); // To Uncheck "Select All"
      } else if (active.length === selectedDates.length) {
        setActiveStep(activeStep + 1);
      } else {
        const nextIndex = (active[active.length - 1] + 1) % selectedDates.length;
        setActiveStep(0);
        setActive([...active, nextIndex]);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLunchPreference('');
    setCabTiming('');
    setReviewData({});
    setActive([]); // To Clear booked dates
    setBookings([]); // To Clear all bookings
    setSelectAll(false); // To Uncheck "Select All"
  };

  const handleLunchPreferenceChange = (event) => {
    setLunchPreference(event.target.value);
  };

  const handleCabTimingChange = (event) => {
    setCabTiming(event.target.value);
  };

  const updateBookingData = () => {
    const selectedDateData = {
      date: selectedDates[active[active.length - 1]].toDateString(),
      lunchPreference,
      cabTiming,
    };
    setBookings([...bookings, selectedDateData]);
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: 7, paddingRight: 7 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '30vw', padding: '5%' }}>
        <div>
          <FormControlLabel
            control={
              <Radio
                checked={selectAll}
                onChange={handleSelectAll}
                color="primary"
              />
            }
            label="Select All"
          />
        </div>
        {selectedDates.map((d, index) => (
          <div key={index} style={{ paddingRight: '20px' }}>
            <Button
              variant="contained"
              onClick={() => handleBooking(index)}
              color={active.includes(index) ? 'success' : 'primary'}
            >
              {d.toDateString()}
            </Button>
          </div>
        ))}
      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          const stepIcons = {
            0: <AirlineSeatReclineNormalIcon />,
            1: <LocalTaxiIcon />,
            2: <FastfoodIcon />,
            3: <VisibilityIcon />,
          };

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                StepIconComponent={({ active, completed }) => (
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: active
                        ? 'red'
                        : completed
                        ? 'green'
                        : activeStep > index
                        ? 'grey'
                        : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stepIcons[index]}
                  </div>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              
            </Box>
          </React.Fragment>
        )}
        {activeStep === 2 ? (
          <React.Fragment>
            <div>
              <FormControl component="fieldset">
              <Typography variant="h5" style={{ textAlign: 'left', paddingTop: '20px', fontSize: '30px' }}>
                <span style={{ color: '#0071BA' }}>Book </span>
                <span>Your Lunch!</span>
              </Typography>
                <Typography variant="h6" gutterBottom>
                  Lunch Preferences:
                </Typography>
                <RadioGroup
                  aria-label="lunch-preference"
                  name="lunch-preference"
                  value={lunchPreference}
                  onChange={handleLunchPreferenceChange}
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
                    value="None"
                    control={<Radio />}
                    label="None"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>
            <div>
              <FormControl fullWidth>
              <Typography variant="h5" style={{ textAlign: 'left', paddingTop: '20px', fontSize: '30px' }}>
                <span>Book Your</span>
                <span style={{ color: '#0071BA' }}> Cab!</span>
              </Typography>
                <Typography variant="h6" gutterBottom>
                  Choose Timings:
                </Typography>
                <Select
                  labelId="cab-timing-label"
                  id="cab-timing"
                  value={cabTiming}
                  onChange={handleCabTimingChange}
                >
                  <MenuItem value="9:00am-5:00pm">9:00am-5:00pm</MenuItem>
                  <MenuItem value="5:00am-2:00pm">5:00am-2:00pm</MenuItem>
                  <MenuItem value="6:00am-3:00pm">6:00am-3:00pm</MenuItem>
                </Select>
              </FormControl>
            </div>
          </React.Fragment>
        ) : null}
      </Box>
      {activeStep === steps.length - 1 && (
        <div>
          <Typography variant="h5" style={{ textAlign: 'left', paddingTop: '20px', fontSize: '30px' }}>
                <span style={{ color: '#0071BA' }}>Review </span>
                <span>Your Requests</span>
              </Typography>
          {active.map((index, idx) => (
            <div key={idx}>
              <Typography variant="h6" fontWeight="bold" style={{paddingTop:'10px'}}>{selectedDates[index].toDateString()}</Typography>
              <Typography>Lunch Preference: {reviewData.lunchPreference}</Typography>
              <Typography>Cab Timing: {reviewData.cabTiming}</Typography>
              {bookings.length > idx && (
                <Typography>Booking Data: {bookings[idx].lunchPreference} - {bookings[idx].cabTiming}</Typography>
              )}
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Timeline;
