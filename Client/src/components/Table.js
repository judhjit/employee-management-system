import { Tooltip } from '@mui/material';
import React from 'react';

const Table = ({ position, activeTable, setActiveTable, bookedTable, shouldUpdateSelectedSeat, singleSelect }) => {

  const isTableBooked = bookedTable.some(item => item.seat === position.name);

  const found = bookedTable.find(obj => obj.seat === position.name);

  return (
    <Tooltip
      title={singleSelect ? (isTableBooked ? ` booked : ${found.name}` : '') : (isTableBooked ? ` booked ` : '')}
      placement="top"
      arrow
    >
      <button
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          top: position.top,
          left: position.left,
          cursor: 'pointer',
          border: 0,
          opacity: 0.1,
          backgroundColor: position.name === activeTable
            ? 'green'
            : bookedTable.some(item => item.seat === position.name)
              ? 'black'
              : 'grey',
        }}
        onClick={() => {
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

export default Table;