import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./CurrentBookings.css";
import api from "../api";

const CurrentBookings = (showNewsFeed) => {
  const initialData = [];
  let dates = [];

  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    let response;
    try {
      response = await api.post('/user/getbookings', {
        isDeskRequired: true,
        isCabRequired: true,
        isFoodRequired: true,
      });
      console.log(response.data);
      setData([...response.data]);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("No data found!");
        setData([]);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editCab = async (dates, newValue) => {
    if (!Array.isArray(dates)) {
      dates = [dates];
    }
    let response;
    try {
      response = await api.patch("/user/bookings", {
        dates: dates,
        modifyCab: true,
        modifyFood: false,
        workSlot: newValue,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const editFood = async (dates, newValue) => {
    if (!Array.isArray(dates)) {
      dates = [dates];
    }
    let response;
    try {
      response = await api.patch("/user/bookings", {
        dates: dates,
        modifyCab: false,
        modifyFood: true,
        preference: newValue,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (dates, type) => {
    let response;
    if (!Array.isArray(dates)) {
      dates = [dates];
    }
    if (type === "Desk") {
      try {
        response = await api.post("/user/deletebookings", {
          dates: dates,
          cancelDesk: true,
          cancelCab: true,
          cancelFood: true,
        });
        fetchData();
        // setData([...data.filter((booking) => booking.dateBooked !== dates[0])]);
      } catch (error) {
        console.error(error);
      }
    } else if (type === "Cab") {
      try {
        response = await api.post("/user/deletebookings", {
          dates: dates,
          cancelDesk: false,
          cancelCab: true,
          cancelFood: false,
        });
        fetchData();
        // setData([...data.filter((booking) => booking.dateBooked !== dates[0])]);
      } catch (error) {
        console.error(error);
      }
    } else if (type === "Food") {
      try {
        response = await api.post("/user/deletebookings", {
          dates: dates,
          cancelDesk: false,
          cancelCab: false,
          cancelFood: true,
        });
        fetchData();
        // setData([...data.filter((booking) => booking.dateBooked !== dates[0])]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleEdit = (rowIndex) => {
  //   setEditIndex(rowIndex);
  //   setEditedCab(data[rowIndex].cab);
  //   setEditedMeal(data[rowIndex].meal);
  // };

  return (
    <div className="table-container">
      {/* <h2 className='booking'>Current Bookings</h2> */}
      <div
        style={{
          fontSize: "29px",
          fontFamily: "poppins",
          fontWeight: 600,
          marginLeft: "90px",
          paddingTop: "20px",
          color: "#0071BA",
        }}
      >
        <span>Current </span>
        <span>Bookings:</span>
      </div>
      <TableContainer 
        style={{
          width: "97vw", 
          padding: "0 10px", 
          height: "190px",
          marginTop:"3vh",
        }}
      >
        <Table stickyHeader>
          <TableHead >
            <TableRow
              // style={{
              //   backgroundColor: "#0071BA",
              // }}
            >
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "20px",
                }}
              >
                Sl No.
              </TableCell>
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "20px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  fontFamily: "poppins",
                  backgroundColor: "#0071BA",
                  fontSize: "20px",
                }}
              >
                Type
              </TableCell>
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  fontFamily: "poppins",
                  backgroundColor: "#0071BA",
                  fontSize: "20px",
                }}
              >
                Preference
              </TableCell>
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "20px",
                }}
              >
                Delete
              </TableCell>
              <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "20px",
                 
                }}
              >
                Modify
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((booking, index) => (
              <TableRow style={{ padding: 5 }}>
                <TableCell style={{ padding: 5 }}>{index + 1}</TableCell>
                <TableCell style={{ padding: 5 }}>
                  {booking.dateBooked}
                </TableCell>
                <TableCell style={{ padding: 5 }}>{booking.type}</TableCell>
                <TableCell style={{ padding: 5 }}>{booking.selected}</TableCell>
                <TableCell style={{ padding: 5 }}>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      handleCancel(booking.dateBooked, booking.type)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{ padding: 5 }}>
                  {booking.type === "Cab" && (
                    <Select
                      style={{ width: "200px" }}
                      name="workSlot"
                      // defaultValue={booking.selected}
                      value={booking.selected}
                      onChange={(e) =>
                        editCab(booking.dateBooked, e.target.value)
                      }
                    >
                      {/* // <option value="9:00am-5:00pm">9:00am-5:00pm</option>
                    // <option value="5:00am-2:00pm">5:00am-2:00pm</option>
                    // <option value="6:00am-3:00pm">6:00am-3:00pm</option> */}
                      <MenuItem value="5:00AM-2:00PM">5:00AM-2:00PM</MenuItem>
                      <MenuItem value="6:00AM-3:00PM">6:00AM-3:00PM</MenuItem>
                      <MenuItem value="9:00AM-5:00PM">9:00AM-5:00PM</MenuItem>
                    </Select>
                  )}
                  {booking.type === "Food" && (
                    <Select
                      style={{ width: "200px" }}
                      name="preference"
                      // defaultValue={booking.selected}
                      value={booking.selected}
                      onChange={(e) =>
                        editFood(booking.dateBooked, e.target.value)
                      }
                    >
                      {/* <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option> */}
                      <MenuItem value="Veg">Veg</MenuItem>
                      <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                    </Select>
                  )}
                </TableCell>
                {/* <TableCell style={{ padding: 2 }}>
                  {booking[index].type === "Cab" && (<Button
                    variant="contained"
                    color="primary"
                    onClick={() => editCab()}
                  >
                    Save
                  </Button>)
                  }
                  {booking[index].type === "Food" && (<Button
                    variant="contained"
                    color="primary"
                    onClick={() => editFood()}
                  >
                    Save
                  </Button>)
                  }
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurrentBookings;
