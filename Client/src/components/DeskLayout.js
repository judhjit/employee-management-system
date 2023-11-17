import React, { useState } from 'react';
import officeLayout from '../assets/OfficeLayout.jpeg';
import Table from './Table';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const DeskLayout = ({ active, setSelectedSeat, selectedSeats }) => {
  const [activeTable, setActiveTable] = useState(selectedSeats[active]);
 

  console.log(selectedSeats)
  
  useEffect(() => {
    
    
    setSelectedSeat((prevArray) => {
      const newArray = [...prevArray];
      newArray[active] = activeTable;
      return newArray;
    });    
  }, [activeTable]);

  const bookedTable = [{name:"Aditi",seat:"C1"}];
 
  return (
    <div >
      <Box sx={{ position: 'relative', marginLeft: '95px', marginTop: '-12px', width: '608px' }}>
        <img src={officeLayout} style={{ width: '100%', height: 'auto' }} />
        <div >
        <Table
          position={{ top: '22%', left: '5%', name: 'T1' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />

        <Table
          position={{ top: '5%', left: '27.5%', name: 'C1' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />

        <Table
          position={{ top: '5%', left: '45%', name: 'C2' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />

        <Table
          position={{ top: '5%', left: '62.5%', name: 'C3' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />       
        
         <Table
          position={{ top: '5%', left: '73.8%', name: 'R1' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        </div>
        <div>
        <Table
          position={{ top: '50%', left: '31.5%', name: 'M1' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
          position={{ top: '50%', left: '42%', name: 'M2' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
          position={{ top: '50%', left: '54.5%', name: 'M3' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
        
          position={{ top: '50%', left: '64%', name: 'M4' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
          
        />
         <Table
        position={{ top: '50%', left: '76%', name: 'M5' }}
        activeTable={activeTable}
        bookedTable={bookedTable}
        setActiveTable={setActiveTable}
        
        />

        <Table
        position={{ top: '50%', left: '86%', name: 'M6' }}
        activeTable={activeTable}
        bookedTable={bookedTable}
        setActiveTable={setActiveTable}
        
        />
        </div>
        <div>
        <Table
          position={{ top: '39%', left: '31.5%', name: 'M7' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
          position={{ top: '39%', left: '42%', name: 'M8' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
          position={{ top: '39%', left: '54.5%', name: 'M9' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
        />
        <Table
        
          position={{ top: '39%', left: '64%', name: 'M10' }}
          activeTable={activeTable}
          bookedTable={bookedTable}
          setActiveTable={setActiveTable}
          
        />
         <Table
        position={{ top: '39%', left: '76%', name: 'M11' }}
        activeTable={activeTable}
        bookedTable={bookedTable}
        setActiveTable={setActiveTable}
        
        />

        <Table
        position={{ top: '39%', left: '86%', name: 'M12' }}
        activeTable={activeTable}
        bookedTable={bookedTable}
        setActiveTable={setActiveTable}
        
        />
        </div>
      </Box>
    </div>
  );
};

export default DeskLayout;