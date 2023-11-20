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
  makeStyles,
  styled,
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
import api from "../../api";

const Requests = () => {
  const [initialData, setInitialData] = useState([]);

  // const [filterService, setFilterService] = useState('Service Type');

  // const handleServiceFilterChange = (event) => {
  //           setFilterService(event.target.value);
  //       };
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [isDeskRequired, setIsDeskRequired] = useState(true);
  const [isCabRequired, setIsCabRequired] = useState(true);
  const [isFoodRequired, setIsFoodRequired] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(
          '/admin/getallbookings',
          {
            isDeskRequired: isDeskRequired,
            isCabRequired: isCabRequired,
            isFoodRequired: isFoodRequired,
          }
        );
        console.log(response.data);
        setInitialData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDeskRequired, isCabRequired, isFoodRequired]);


  const StyledDatePicker = styled(DatePicker)({
    '& .MuiInputBase-root': {
      height: '53px', // Adjust the height as needed
    },
  });


  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(initialData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'initial data');
    XLSX.writeFile(wb, 'aditi.xlsx');
  };

  const handleServiceChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === 'Car') {
      setIsDeskRequired(false);
      setIsCabRequired(true);
      setIsFoodRequired(false);
    } else if (selectedValue === 'Desk') {
      setIsDeskRequired(true);
      setIsCabRequired(false);
      setIsFoodRequired(false);
    } else if (selectedValue === 'Lunch') {
      setIsDeskRequired(false);
      setIsCabRequired(false);
      setIsFoodRequired(true);
    } else if (selectedValue === 'all') {
      setIsDeskRequired(true);
      setIsCabRequired(true);
      setIsFoodRequired(true);
    }
  }

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2.9vw",
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
          <LocalizationProvider dateAdapter={AdapterDayjs} style={{ fontFamily: "poppins", height: '51px' }}>
            <DemoContainer components={["DatePicker", "DatePicker"]} >
              <StyledDatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}

              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <StyledDatePicker
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
          placeholder="User ID"
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
          }} onChange={(e) => handleServiceChange(e)}
        >
          <option value="Car">Car</option>
          <option value="Desk">Desk</option>

          <option value="Lunch">Lunch</option>
          <option value="all">All</option>
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
          <option value="all">All</option>
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
                    {item.userId}
                  </TableCell>
                  <TableCell>{item.dateBooked}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ paddingLeft: '5vw' }}>
          <Button

            onClick={exportToExcel}
            style={{
              marginTop: '2vw',
              marginLeft: '50vw',
              height: '2vw',
              width: '12vw',
              color: 'black',
            }}
          >
            Export To Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Requests;