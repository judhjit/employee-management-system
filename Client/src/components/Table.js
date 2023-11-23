

import { Tooltip } from '@mui/material';
import React from 'react'

const Table = ({ position, activeTable, setActiveTable, bookedTable,shouldUpdateSelectedSeat}) => {
    
    // console.log(activeTable)
    const isTableBooked = bookedTable.some(item => item.seat === position.name);

    const found = bookedTable.find(obj => {
        return obj.seat === position.name;
      });

    return (
        <Tooltip
        title={isTableBooked ? ` booked : ${found.name}` : ''}
        placement="top"
        arrow
      >
        <button
            style={{
                position: 'absolute',
                // backgroundColor:'grey',
                width: '50px', height: '50px',
                top: position.top,
                left: position.left,
                cursor: 'pointer',
                border:0,
                opacity:0.1,
                // transform: 'translate(-50%, -50%)', // Center the icon on the coordinates
                backgroundColor: position.name === activeTable
                ? 'green'
                : bookedTable.some(item => item.seat === position.name)
                  ? 'black' // Set to red if the button is disabled
                  : 'grey',

            }} onClick={() => {
                if (!bookedTable.some(item => item.seat === position.name)) {
                    setActiveTable(position.name);
                    shouldUpdateSelectedSeat.current = true;
                }              
            }}
            disabled={bookedTable.some(item => item.seat === position.name)}
        >
            <p>
                {position.name}
            </p>
        </button>
        </Tooltip>
    );
}

export default Table