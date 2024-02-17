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
  Paper,
  TextField,
  Fab
} from "@mui/material";
import api from "../api";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const HolidayListUser = ({ isAdmin }) => {
  const [holidays, setHolidays] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  

  useEffect(() => {
    api
      .get("/user/getholidaysofthisandupcomingyears")
      .then((response) => {
        setHolidays(response.data.holidays);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/admin/getholidaysofthisandupcomingyears")
      .then((response) => {
        setHolidays(response.data.holidays);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const createHoliday = (event) => {
    event.preventDefault();
    api
      .post("/admin/createholiday", { holidayName, holidayDate })
      .then((response) => {
        setHolidays([
          ...holidays,
          { holiday_name: holidayName, holiday_date: holidayDate },
        ]);
        setHolidayName("");
        setHolidayDate("");
        setShowAddForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteHoliday = (holiday) => {
    api.post('/admin/deleteholiday', { holidayName: holiday.holiday_name, holidayDate: holiday.holiday_date })
        .then(response => {
            setHolidays(holidays.filter(h => h.holiday_date !== holiday.holiday_date));
            setShowAddForm(false);
            
        })
        .catch(error => {
            console.log(error);
          })
          
};

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "664px",
        width: "75vw",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Holidays
        {isAdmin && (
          <Fab color="primary" aria-label="add" onClick={toggleAddForm} style={{marginLeft:'50px',height:'50px'}}>
            <AddIcon />
          </Fab>
        )}
      </h1>
      {showAddForm && (
        <form onSubmit={createHoliday} >
          <TextField
            label="Holiday Name"
            type="text"
            value={holidayName}
            style={{marginRight:'4px'}}
            onChange={(event) => setHolidayName(event.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
          label="Holiday Date"
            type="date"
            value={holidayDate}
            style={{marginRight:'4px'}}
            onChange={(event) => setHolidayDate(event.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </form>
      )}
      <TableContainer
        component={Paper}
        style={{
          width: "70vw",
          marginTop: "0.2vw",
          marginLeft: "2vw",
          maxHeight: 400,
          justifyContent: "center",
          border: "1px solid #E9E9E9",
          borderRadius: "10px",
        }}
      >
        <Table sx={{ minWidth: 500 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#004B81",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Holiday Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#004B81",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Holiday Date
              </TableCell>
              {showAddForm && ( 
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays
              .sort((a, b) => a.holiday_date.localeCompare(b.holiday_date))
              .map((holiday) => (
                <TableRow key={holiday.holiday_date}>
                  <TableCell>{holiday.holiday_name}</TableCell>
                  <TableCell>{holiday.holiday_date}</TableCell>
                  {showAddForm && ( 
                    <TableCell>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => deleteHoliday(holiday)}
                      >
                        <DeleteIcon />
                        </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HolidayListUser;
