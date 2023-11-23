import React, { useRef, useState } from 'react';
import officeLayout from '../assets/OfficeLayout.jpeg';
import Table from './Table';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const DeskLayoutAll = ({ setSelectedSeat, selectedSeats, responce ,bookings,setBookings}) => {
  const [activeTable, setActiveTable] = useState("null")
  // const bookedTable = [{name:"Aditi",seat:"C1"}];
  const shouldUpdateSelectedSeat = useRef(false);
  const [bookedTable, setBookedTable] = useState([])

  console.log("all responce ", responce)
  useEffect(() => {
    setSelectedSeat(selectedSeats.fill(activeTable));
    console.log(selectedSeats)
    shouldUpdateSelectedSeat.current = false;
    setBookings((prevBookings) => ({
      ...prevBookings,
      deskId: selectedSeats,
    }));
  }, [activeTable])

  useEffect(() => {
    const getData = () => {
      try {

        Object.keys(responce).forEach(key => {
          if (responce[key].deskId) {
            responce[key].bookedBy.forEach(e => {
              if (e !== null) {
                const booking = { name: "ABC", seat: responce[key].deskId };
                // tempBookedTable.push(temp);
                setBookedTable(prevBookedTable => prevBookedTable.concat(booking));
              }
            });
          }
        });

        console.log("setBookedTable", setBookedTable)
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [responce]);

  return (
    <div>
      <Box sx={{ position: 'relative', marginLeft: '95px', marginTop: '-12px', width: '608px' }}>
        <img src={officeLayout} style={{width: '100%', height: 'auto', marginTop: '0px', marginLeft: '-2px' }} />

        <div >
          <Table
            position={{ top: '22%', left: '5%', name: 'A1' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
            shouldUpdateSelectedSeat={shouldUpdateSelectedSeat}
          />

          <Table
            position={{ top: '5%', left: '27.5%', name: 'A2' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
            shouldUpdateSelectedSeat={shouldUpdateSelectedSeat}
          />

          <Table
            position={{ top: '5%', left: '45%', name: 'A3' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
            shouldUpdateSelectedSeat={shouldUpdateSelectedSeat}
          />

          <Table
            position={{ top: '5%', left: '62.5%', name: 'A4' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
            shouldUpdateSelectedSeat={shouldUpdateSelectedSeat}
          />

          <Table
            position={{ top: '5%', left: '73.8%', name: 'B1' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
            shouldUpdateSelectedSeat={shouldUpdateSelectedSeat}
          />
        </div>
        <div>
          <Table
            position={{ top: '50%', left: '31.5%', name: 'B2' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table
            position={{ top: '50%', left: '42%', name: 'B3' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table
            position={{ top: '50%', left: '54.5%', name: 'B4' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table

            position={{ top: '50%', left: '64%', name: 'B5' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />
          <Table
            position={{ top: '50%', left: '76%', name: 'A5' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />

          <Table
            position={{ top: '50%', left: '86%', name: 'B6' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />
        </div>
        <div>
          <Table
            position={{ top: '39%', left: '31.5%', name: 'B7' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table
            position={{ top: '39%', left: '42%', name: 'B8' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table
            position={{ top: '39%', left: '54.5%', name: 'A6' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}
          />
          <Table

            position={{ top: '39%', left: '64%', name: 'A7' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />
          <Table
            position={{ top: '39%', left: '76%', name: 'A8' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />

          <Table
            position={{ top: '39%', left: '86%', name: 'A9' }}
            activeTable={activeTable}
            bookedTable={bookedTable}
            setActiveTable={setActiveTable}

          />
        </div>
      </Box>
    </div>
  );
};

export default DeskLayoutAll;