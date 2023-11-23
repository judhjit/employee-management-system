
import React from "react";
import { styled } from "@mui/system";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { Button, Typography } from "@mui/material";
import DeskBooking from "./DeskBooking";
import LunchAndCabbook from "./LunchAndCabbook";
import Review from "./Review";

const useStyles = styled((theme) => ({
    root: {
      
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto",
      // Align to the right side
      paddingRight: theme.spacing(6), // Add right padding for better spacing
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepLabel: {
      marginTop: theme.spacing(1),
      textAlign: "right", // Align text to the right
    },
    stepIcon: {
      width: theme.spacing(4), // Adjust the size as needed
      height: theme.spacing(4), // Adjust the size as needed
    },
  }));
  

function getSteps() {
  return ["Desk Booking", "Lunch And Cab Booking", "Review"];
}

const Bookings = ({ selectedDates ,bookings,setBookings}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    

    setBookings={setBookings};
    bookings={bookings};
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }


    setBookings((prevBookings) => ({
      ...prevBookings,
      preference: Array(selectedDates.length).fill("None"),
      workSlot: Array(selectedDates.length).fill("None"),
      isCabRequired:false,
      isMealRequired:false
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step, { onNext, onBack, onSkip }) {
    switch (step) {
      case 0:
        return <DeskBooking selectedDates={selectedDates} onNext={onNext} onBack={onBack} onSkip={onSkip}  bookings={bookings} 
        setBookings={setBookings}/>;
      case 1:
        return <LunchAndCabbook selectedDates={selectedDates} onNext={onNext} onBack={onBack} onSkip={onSkip} bookings={bookings} 
        setBookings={setBookings}/>;
      case 2:
        return <Review setBookings={setBookings} bookings={bookings} />;
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root} style={{ width: '1100px'}}>
      <Stepper activeStep={activeStep} alternativeLabel style={{marginLeft:'780px',zIndex:'1',position:'relative',marginTop:'64px'}}>
        {steps.map((label, index) => (
          <Step key={label} >
            <StepLabel className={classes.stepLabel} >
              <StepIcon className={classes.stepIcon} />
              <Typography variant="caption">{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Typography className={classes.instructions}>
          {getStepContent(activeStep, { onNext: handleNext, onBack: handleBack, onSkip: handleSkip })}
        </Typography>
      </div>
    </div>
  );
};

export default Bookings;