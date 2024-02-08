import * as React from "react";
import { useState, useEffect } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LunchAndCabForm from "./LunchAndCabForm";
import LunchAndCabFormAll from "./LunchAndCabFormAll";


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

export default function LunchAndCabbook({
  selectedDates,
  onNext,
  onSkip,
  onBack,
  bookings, setBookings
}) {
  const [value, setValue] = React.useState(0);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  // const [selectedCab, setSelectedCab] = useState(Array(selectedDates.length).fill(null));
  const [selectedMeal, setSelectedMeal] = useState(Array(selectedDates.length).fill(null));

  console.log("bookingslunchandcab", bookings);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const containsNonNullMeal = selectedMeal.some(element => element !== null);
    if (containsNonNullMeal) {
      setBookings((prevBookings) => ({
        ...prevBookings,
        isFoodRequired: true
      }));

    }

    // const containsNonNullCab = selectedCab.some(element => element !== null);
    // if (containsNonNullCab) {
    //   setBookings((prevBookings) => ({
    //     ...prevBookings,
    //     isCabRequired: true
    //   }));

    // }
  }, [selectedMeal])

  // const [selectedSlot, setSelectedSlot] = useState("Morning");
  const [selectedLunch, setSelectedLunch] = useState("none");
  const [active, setActive] = useState(-1);
  const [selectAllDates, setSelectAllDates] = useState(false);

  const handleActiveStatus = (index) => {
    setActive(index);
  };

  const handleLunchChange = (event, dateIndex) => {
    const updatedPreferences = { ...selectedPreferences };
    updatedPreferences[dateIndex] = event.target.value;
    setSelectedPreferences(updatedPreferences);
  };
  const currentDate = new Date();


  return (
    <Box sx={{ width: "70%", fontFamily: "poppins" }}>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#F6F6F6",
          height: "80vh",
          width: "1103px",
          // width: "71vw",
          marginLeft: "42px",
          marginTop: "-68px",
          zIndex: 0,
        }}
      >
        <Box sx={{ paddingBottom: "30px", paddingLeft: "120px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Select Single Dates"
              {...a11yProps(0)}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            />
            <Tab
              label="Select Multpile Dates"
              {...a11yProps(1)}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div style={{ display: "flex", marginLeft: "80px" }}>
            {selectedDates.map((d, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  disabled={new Date(d) - currentDate < 14 * 24 * 60 * 60 * 1000}

                  onClick={() => handleActiveStatus(index)}
                  style={{
                    paddingLeft: "100px",
                    marginBottom: "10px",
                    marginLeft: "30px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "11px 20px",
                    borderRadius: "54px",
                    border: "1px solid #D6D6D6",
                    fontSize: "13px",
                    fontFamily: "poppins",
                    lineHeight: "15px",
                    width: "160px",
                    fontWeight: 500,
                    color: index === active ? "#FFF" : "#000",
                    backgroundColor:
                      index === active ? "#0071BA" : "transparent",
                    marginBottom: "30px",
                  }}
                  color={index === active ? "primary" : "grey"}
                >
                  {d.toDateString()}
                </Button>
              </div>
            ))}
          </div>
          {/* <div>
              {
                (selectedDates.length()!=0 && <LunchAndCabForm setActive={setActive} active={active}/>)
              }
            </div> */}
          <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <LunchAndCabForm active={active} setSelectedMeal={setSelectedMeal} selectedMeal={selectedMeal} bookings={bookings} setBookings={setBookings} />
            <Button
              variant="contained"
              style={{ marginTop: "70px", width: "150px", marginTop: "350px" }}
              onClick={onNext}

            >
              Submit{" "}
            </Button>
            <Button
              style={{
                marginLeft: "-51px",
                width: "16px",
                marginTop: "-200px",
                position: "absolute",
                border: 0,
              }}
              onClick={onBack}
            >
              <ArrowBackIcon />
            </Button>
            {/* <Button
              variant="contained"
              style={{
                width: "150px",
                marginTop: "350px",
                marginLeft: "640px",
                position: "absolute",
              }}
              onClick={onSkip}
            >
              skip{" "}
            </Button> */}
          </Box>
          {/* <Button
          variant="contained"
          style={{ marginLeft: "650px", marginTop: "70px", width: "200px" }}
        >
          Submit{" "}
        </Button> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <LunchAndCabFormAll setSelectedMeal={setSelectedMeal} selectedMeal={selectedMeal} bookings={bookings} setBookings={setBookings} active={active} selectedDates={selectedDates} />
              <Button
                style={{
                  marginLeft: "-51px",
                  width: "16px",
                  marginTop: "-132px",
                  position: "absolute",
                  border: 0,
                }}
                onClick={onBack}
              >
                <ArrowBackIcon />
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: "70px",
                  width: "200px",
                  marginTop: "350px",
                }} onClick={onNext}
              >
                Submit{" "}
              </Button>
            </Box>
          </div>
        </CustomTabPanel>
      </div>
    </Box>
  );
}