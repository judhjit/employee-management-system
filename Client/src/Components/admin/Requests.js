import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import "./Requests.css";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Requests = () => {
  const initialData = [
    { EmpID: "1234", Service: "Desk", date: "01/02/2023" },
    { EmpID: "1234", Service: "Cab", date: "01/02/2023" },
    { EmpID: "1235", Service: "Desk", date: "15/03/2023" },
    { EmpID: "1234", Service: "Lunch", date: "01/02/2023" },
    { EmpID: "1325", Service: "Desk", date: "20/12/2023" },
    { EmpID: "1329", Service: "Lunch", date: "20/11/2023" },
    { EmpID: "1234", Service: "Cab", date: "02/02/2023" },
    { EmpID: "1330", Service: "Cab", date: "05/11/2023" },
    { EmpID: "1332", Service: "Desk", date: "06/11/2023" },
    { EmpID: "1326", Service: "Lunch", date: "07/01/2024" },
    { EmpID: "1272", Service: "Cab", date: "01/02/2023" },
    { EmpID: "1271", Service: "Desk", date: "15/03/2023" },
    { EmpID: "1348", Service: "Lunch", date: "20/04/2023" },
    { EmpID: "1370", Service: "Desk", date: "20/12/2023" },
    { EmpID: "1341", Service: "Lunch", date: "20/11/2023" },
  ];

  // const [filterService, setFilterService] = useState('Service Type');

  // const handleServiceFilterChange = (event) => {
  //           setFilterService(event.target.value);
  //       };
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "741px",
        width: "75vw",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "0.6vw",
          fontFamily: "poppins",
        }}
      >
        <div
          style={{
            marginLeft: "35px",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            borderRadius: "17px",
            width: "29vw",
            height: "70px",
            borderColor: "#C3C3C3",
            fontFamily: "poppins",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                style={{ fontFamily: "poppins", fontSize: "8px" }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="end Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                style={{ fontFamily: "poppins" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <input
          type="text"
          placeholder="Employee Id"
          style={{
            width: "12vw",
            height: "51px",
            marginLeft: "0.4vw",
            color: "grey",
            justifyContent: "center",
            paddingLeft: "15px",
            borderRadius: "4px",
            border: "1px solid #C3C3C3",
            marginTop: "0.6vw",
          }}
        />

        <select
          label="service Type"
          style={{
            width: "11vw",
            height: "54px",
            color: "grey",
            marginLeft: "0.4vw",
            paddingLeft: "15px",
            borderRadius: "4px",
            border: "1px solid #C3C3C3",
            marginTop: "0.6vw",
          }}
        >
          <option value="Car">Car</option>
          <option value="Desk">Desk</option>

          <option value="Lunch">Lunch</option>
          <option value="all">all</option>
        </select>

        <select
          placeholder="Choose date"
          style={{
            width: "11vw",
            height: "54px",
            color: "grey",
            marginLeft: "0.4vw",
            paddingLeft: "15px",
            borderRadius: "4px",
            border: "1px solid #C3C3C3",
            marginTop: "0.6vw",
          }}
        >
          <option value="1w">1 week</option>
          <option value="1m">1 month</option>

          <option value="6m">6 months</option>
          <option value="all">all</option>
        </select>

        <Fab
          aria-label="Search"
          style={{
            marginLeft: "20px",
            backgroundColor: "#79C6F1",
            color: "white",
          }}
        >
          <SearchIcon />
        </Fab>
      </div>

      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "70vw",
            marginTop: "0.2vw",
            marginLeft: "2vw",
            maxHeight: 520,
            justifyContent: "center",
            border: "1px solid #E9E9E9",
            borderRadius: "10px",
          }}
          className="table1"
        >
          <Table sx={{ minWidth: 500 }} stickyHeader>
            <TableHead className="tablehead">
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Employee ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#004B81",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Services
                </TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "	#F5F5F5" }}>
              {initialData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "#0071BA", fontWeight: "bold" }}>
                    {item.EmpID}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.Service}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Requests;