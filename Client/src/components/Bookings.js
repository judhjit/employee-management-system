// import React from "react";
// import { styled } from '@mui/system';

// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { Button } from "@mui/material";
// import Typography from '@mui/material/Typography';
// import DeskBooking from "./DeskBooking";
// import LunchAndCabbook from "./LunchAndCabbook";


// const useStyles = styled((theme) => ({
//   root: {
//     width: "100%"
//   },
//   button: {
//     marginRight: theme.spacing(1)
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1)
//   }
// }));

// function getSteps() {
//   return ["Desk Booking", "Lunch And Cab Booking", "Create an ad"];
// }



//  const Bookings=({selectedDates})=> {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//   const steps = getSteps();

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };


//   function getStepContent(step) {
//     switch (step) {
//       case 0:
//         return <DeskBooking  selectedDates={selectedDates}/>;
//       case 1:
//         return <LunchAndCabbook selectedDates={selectedDates}/>;
//       case 2:
//         return "This is the bit I really care about!";
//       default:
//         return "Unknown step";
//     }
//   }


//   //return
//   return (
//     <div className={classes.root}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Button onClick={handleReset} className={classes.button}>
//               Reset
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Typography className={classes.instructions}>
//               {getStepContent(activeStep)}
//             </Typography>
//             <div>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 className={classes.button}
//               >
//                 Back
//               </Button>
//               {isStepOptional(activeStep) && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSkip}
//                   className={classes.button}
//                 >
//                   Skip
//                 </Button>
//               )}

//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className={classes.button}
//               >
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Bookings;


// import React from "react";
// import { styled } from "@mui/system";

// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepIcon from "@mui/material/StepIcon";
// import { Button, Typography } from "@mui/material";
// import DeskBooking from "./DeskBooking";
// import LunchAndCabbook from "./LunchAndCabbook";

// const useStyles = styled((theme) => ({
//   root: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   stepLabel: {
//     marginTop: theme.spacing(1),
//   },
//   stepIcon: {
//     width: theme.spacing(4), // Adjust the size as needed
//     height: theme.spacing(4), // Adjust the size as needed
//   },
// }));

// function getSteps() {
//   return ["Desk Booking", "Lunch And Cab Booking", "Create an ad"];
// }

// const Bookings = ({ selectedDates }) => {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//   const steps = getSteps();

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   function getStepContent(step) {
//     switch (step) {
//       case 0:
//         return <DeskBooking selectedDates={selectedDates} onNext={handleNext} />;
//       case 1:
//         return <LunchAndCabbook selectedDates={selectedDates} onNext={handleNext} />;
//       case 2:
//         return "This is the bit I really care about!";
//       default:
//         return "Unknown step";
//     }
//   }

//   return (
//     <div className={classes.root} style={{width:'400px',height:'300px'}}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel className={classes.stepLabel}>
//               <StepIcon className={classes.stepIcon}  />
//               <Typography variant="caption">{label}</Typography>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//         <div>
//           <Button
//             disabled={activeStep === 0}
//             onClick={handleBack}
//             className={classes.button}
//           >
//             Back
//           </Button>
//           {isStepOptional(activeStep) && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSkip}
//               className={classes.button}
//             >
//               Skip
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleNext}
//             className={classes.button}
//           >
//             {activeStep === steps.length - 1 ? "Finish" : "Next"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;


import React from "react";
import { styled } from "@mui/system";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { Button, Typography } from "@mui/material";
import DeskBooking from "./DeskBooking";
import LunchAndCabbook from "./LunchAndCabbook";

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
  return ["Desk Booking", "Lunch And Cab Booking", "Create an ad"];
}

const Bookings = ({ selectedDates }) => {
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
        return <DeskBooking selectedDates={selectedDates} onNext={onNext} onBack={onBack} onSkip={onSkip} />;
      case 1:
        return <LunchAndCabbook selectedDates={selectedDates} onNext={onNext} onBack={onBack} onSkip={onSkip} />;
      case 2:
        return "All bookings Has been done";
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


