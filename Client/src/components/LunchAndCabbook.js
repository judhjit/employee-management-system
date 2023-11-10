
import { Button } from '@mui/material';
import React, { useState } from 'react';
import LunchAndCabForm from './LunchAndCabForm';

const LunchAndCabbook = ({ selectedDates }) => {
  const [selectDay, setSelectDay] = useState(true);
  const [selectMultiple, setSelectMultiple] = useState(true);
  const [active, setActive] = useState(0);

  const handleDeskView = (index) => {
    setActive(index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'auto',marginRight:'auto' }}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '10vw', paddingRight: '10vw' }}>

        <div style={{ padding: '20px', border: '2px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderRadius: '20px', backgroundColor: '#D9DAE9', width: '50vw' }}>
          <Button
            variant='outlined'
            style={{ width: '23vw', height: '5vh', borderRadius: '20px', fontWeight: '700', fontSize: '100%', backgroundColor: 'white' }}
            onClick={() => {
              setSelectDay(true);
              setSelectMultiple(false);
            }}
          >
            Select Day Wise
          </Button>
          <Button
            variant='outlined'
            style={{ width: '23vw', fontSize: '100%', height: '5vh', borderRadius: '20px', fontWeight: '700', backgroundColor: 'white' }}
            onClick={() => {
              setSelectDay(false);
              setSelectMultiple(true);
            }}
          >
            Select Multiple Days
          </Button>
        </div>
        <div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'row' }}>
          {
            selectDay && (
              selectedDates.map((d, index) => (
                <div key={index}>
                  <Button
                    variant="contained"
                    onClick={() => handleDeskView(index)}
                    style={{ paddingLeft: '10px', marginBottom: '10px', marginRight: '10px' }}
                    color={index === active ? 'success' : 'primary'}
                  >
                    {d.toDateString()}
                  </Button>
                </div>
              ))

            )
          }
        </div>
      </div>
      <div style={{ marginTop: '5vh',marginRight:'9vw' }}>
        {
          active + 1 && <div>
            <LunchAndCabForm selectedDates={selectedDates} />
          </div>
        }
      </div>
    </div>
  );
};

export default LunchAndCabbook;