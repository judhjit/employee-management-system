import { Button, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import Table from './Table';

const DeskBooking = ({ selectedDates }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const [table,bookTable] = useState([{date:"",id:"",tableno:""}])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0071BA', 
      },  
    },
  });

  const handleDeskView = (index) => {
    // <Table/>
    setActive(index);
    // console.log(index);
    const selectedDate = selectedDates[index].toDateString();
  
    
    if (!table.some((record) => record.date === selectedDate)) {
      
      bookTable([...table, { date: selectedDate, id: index  }]);
    }
  };

  useEffect(()=>{
    console.log(table)
  },[table])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '30vw',padding:'5%' }}>
      {selectedDates.map((d, index) => (
        <div key={index}>
          <Button
            variant="contained"
            onClick={() => handleDeskView(index)
             }
            color={index === active ? 'success' : 'primary'}
            
          >
            {d.toDateString()}
          </Button>
          
        </div>
      ))}
      <Button variant="outlined" style={{height:'39px'}}onClick={() => navigate('/lunchandcabbook')} >next</Button>
    </div>
  );
};

export default DeskBooking;