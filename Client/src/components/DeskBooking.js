
import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import officeLayout from "../assets/OfficeLayout.jpeg";
import { Tab, Typography } from "@mui/material";
import DeskLayout from "./DeskLayout";
import DeskLayoutAll from "./DeskLayoutAll";
import api from "../api";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const DeskBooking = ({ selectedDates, onNext, bookings, setBookings }) => {
  const [value, setValue] = React.useState(0);
  const [active, setActive] = useState(0);
  const [selectedSeats, setSelectedSeat] = useState(
    Array(selectedDates.length).fill(null)
  );
  console.log("bookings", bookings);


  const [responce, setresponce] = useState({})

  React.useEffect(() => {
    console.log("selected Dates ",selectedDates)
    const fetchData = async () => {
      const responce = await api.post('/user/getdesks', {
        dates: selectedDates
      })
      setresponce(responce)
      // console.log("indexed",responce.data['A1'])

      // responce.data['A1'].bookedBy[0]="Aditi"
      // responce.data['A2'].bookedBy[1]="Shyam"
      // responce.data['C2'].bookedBy[1]="Chotu"

      console.log("indexed",responce.data['A1'].bookedBy)
      console.log("indexed",responce.data['A2'].bookedBy)
      console.log(responce.data)
      
    }
    fetchData()
  }, [selectedDates])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedSeat(Array(selectedDates.length).fill(null));
  };

  const handleActiveStatus = (index) => {
    setActive(index);
  };

  return (
    <Box sx={{ width: "70%", fontFamily: "poppins" }}>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#F6F6F6",
          height: "80vh",
          width: "71vw",
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
              label="Select Multiple Dates"
              {...a11yProps(1)}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div
            style={{ display: "flex", marginLeft: "80px", marginTop: "9px" }}
          >
            {selectedDates.map((d, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  onClick={() => handleActiveStatus(index)}
                  style={{
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
                    width: "170px",
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
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {selectedDates.length > 0 && (
              <DeskLayout
                active={active}
                selectedSeats={selectedSeats}
                setSelectedSeat={setSelectedSeat}
                bookings={bookings}
                setBookings={setBookings}
                responce={responce.data}
              />
            )}
            <Button
              variant="contained"
              style={{
                width: "108px",
                marginTop: "342px",
                height: "35px",
                marginLeft: "10px",
              }}
              onClick={onNext}
              // disabled={selectedSeats.includes(null)}
            >
              Next
            </Button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div
            style={{ display: "flex", marginLeft: "80px", marginTop: "9px" }}
          >
            {selectedDates.map((d, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  onClick={() => handleActiveStatus(index)}
                  style={{
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
                    width: "170px",
                    fontWeight: 500,
                    // color: index === active ? "#FFF" : "#000",
                    // backgroundColor:
                    //   index === active ? "#0071BA" : "transparent",
                    marginBottom: "30px",
                  }}
                  color="primary"
                >
                  {d.toDateString()}
                </Button>
              </div>
            ))}
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {selectedDates.length > 0 && (
              <DeskLayoutAll
                selectedSeats={selectedSeats}
                setSelectedSeat={setSelectedSeat}
                bookings={bookings}
                setBookings={setBookings}
                responce={responce.data}
              />
            )}
            <Button
              variant="contained"
              style={{
                width: "108px",
                marginTop: "342px",
                height: "35px",
                marginLeft: "10px",
              }}
              onClick={onNext}
            >
              Next{" "}
            </Button>
          </div>
        </CustomTabPanel>
      </div>
    </Box>
  );
};

export default DeskBooking;