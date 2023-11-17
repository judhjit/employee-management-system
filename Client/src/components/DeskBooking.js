import { Button, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import offPhoto from '../assets/OfficeLayout.jpeg'
import './DeskBooking.css'
import { green } from '@mui/material/colors';

import api from '../api';

const DeskBooking = ({ selectedDates }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  
  const [table, bookTable] = useState([{ date: "", id: "", tableno: "" }])
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seat,setSeat] = useState("");
  
  // const response = api.post('/user/getbookings', { isDeskRequired: true, isCabRequired : true, isFoodRequired : true});
  
  // console.log(response);

  const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
  const response = api.post('/user/getdesks', {dates: tomorrow});
  console.log(response);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0071BA",
      },
    },
  });

  const handleDeskView = (index) => {
    setActive(index);
    // console.log(index);
    const selectedDate = selectedDates[index].toDateString();

    // Check if the date already exists in the table
    if (!table.some((record) => record.date === selectedDate)) {
      // If it doesn't exist, add it to the table
      bookTable([...table, { date: selectedDate, id: index }]);
    }
  };

  useEffect(() => {
    console.log(table);
  }, [table]);

  // const handleTableSelect = (e) => {
  //   console.log(e.target.name)

  // }

  const handleTableSelect = (e) => {
    setSeat(e.target.name);
    e.target.style.backgroundColor = "yellow";
    console.log(seat);
  };

  // const handleTableSelect = (e) => {
  //   if (selectedDates && selectedDates[active]) {
  //   const selectedDate = selectedDates[active].toDateString();
  //   const tableNo = e.target.name; // Get the table name

  //   const dateIndex = table.findIndex((record) => record.date === selectedDate);

  //   if (dateIndex !== -1) {

  //     table[dateIndex].tableno = tableNo;
  //   } else {
  //     // If it doesn't exist, add it to the table
  //     bookTable([...table, { date: selectedDate, id: active, tableno: tableNo }]);
  //   }

  //   setSeat(tableNo); // Update the 'seat' state
  //   e.target.style.backgroundColor = 'green';
  //   console.log(table);
  // };

  // const isSeatSelected = (event,name) =>{
  //   if(selectedSeats.includes(name)){
  //     event
  //   }
  // }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "30vw",
          padding: "5%",
        }}
      >
        {selectedDates.map((d, index) => (
          <div key={index}>
            <Button
              variant="contained"
              onClick={() => {
                handleDeskView(index);
              }}
              style={{ paddingLeft: "10px" }}
              color={index === active ? "success" : "primary"}
            >
              {d.toDateString()}
            </Button>
            {index === active}
          </div>
        ))}
        <Button variant="outlined" onClick={() => navigate("/lunchandcabbook")}>
          next
        </Button>
      </div>
      <div style={{ marginLeft: "10%" }}>
        <img
          src={offPhoto}
          style={{
            height: "31vw",
            width: "49vw",
            display: "block",
            position: "relative",
            
          }}
          usemap="#officeMap"
        />
        {/* <map name="officeMap">
          <area
            shape="rect"
            coords="340,52,439,128 "
            alt="point"
            href="seat.htm"
          />
          
        </map> */}

        <button style={{ position: 'relative', top: '-29rem', left: '13rem' ,width:'4vw',height:'4vw',border:0,opacity:0.8}} name='U1' onClick={handleTableSelect}>
          U1
        </button>
        <button style={{ position: 'relative', top: '-29rem', left: '17.5rem' ,width:'4vw',height:'4vw',border:0,opacity:0.2}} name='U1' onClick={handleTableSelect}>
          U2
        </button>
        <button style={{ position: 'relative', top: '-29rem', left: '22rem' ,width:'4vw',height:'4vw',border:0,opacity:0.2}} name='U1' onClick={handleTableSelect}>
          U3
        </button>

        <button style={{ position: 'relative', top: '-28.4rem', left: '23.5rem' ,width:'1vw',height:'1vw',border:0,opacity:0.2,fontSize:'5px'}} name='U1' onClick={handleTableSelect}>
          U4
        </button>
        <button style={{ position: 'relative', top: '-28.4rem', left: '27rem' ,width:'1vw',height:'1vw',border:0,opacity:0.2,fontSize:'5px'}} name='U1' onClick={handleTableSelect}>
          U4
        </button>


        {/* <div style={{marginLeft:'10%'}}>
        <img src={offPhoto} style={{ height: "500px", width: '900px', display: 'block', position: 'relative' }} />

        <button style={{
          position: 'relative', backgroundColor: 'red', top: '-25rem',
          height: '100px',
          width: '50px',
          left: '4.1rem',
        }}
        name='Table1' onClick={handleTableSelect}>
          Table1
        </button>

        <button style={{ position: 'relative', top: '-30rem', left: '13rem' }} name='U1' onClick={handleTableSelect}>
          U1
        </button>
        <button style={{ position: 'relative', top: '-30rem', left: '22rem' }} name='U2' onClick={handleTableSelect}>
          U2
        </button>
        <button style={{ position: 'relative', top: '-30rem', left: '30rem' }} name='U3' onClick={handleTableSelect}>
          U3
        </button>
        <button style={{ position: 'relative', top: '-30.8rem', left: '34rem' }} name='R1' onClick={handleTableSelect}>
          R1
        </button>
        <button style={{ position: 'relative', top: '-30.8rem', left: '37rem' }} name='R2' onClick={handleTableSelect}>
          R2
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '5.9rem' }} name='C1' onClick={handleTableSelect}>
          C1
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '9rem' }} name='C2' onClick={handleTableSelect}>
          C2
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '14.899999999999999rem' }} name='C3' onClick={handleTableSelect}>
          C3
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '17.6rem' }} name='C4' onClick={handleTableSelect}>
          C4
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '22.9rem' }} name='C5' onClick={handleTableSelect}>
          C5
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '26.9rem' }} name='C6' onClick={handleTableSelect}>
          C6
        </button>
        
      </div> */}
      </div>
    </div>
  );
};

export default DeskBooking;
