import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUser, faNewspaper);

const Navbar = () => {
  const [showNewsBox, setShowNewsBox] = useState(false);

  const toggleNewsBox = () => {
    setShowNewsBox(!showNewsBox);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '3.8vw',
        padding: '0.5vw',
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)",
        backgroundColor: 'white',
      }}
    >
      <div>
        <h2 style={{ color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '5px' }}>ABC Group</h2>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Button variant="contained" color="primary" style={{ height: '2vw', width: '2vw' }}>Book</Button>
        <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw', cursor: 'pointer' }} onClick={toggleNewsBox} />
        <FontAwesomeIcon icon={faUser} size="2x" style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }} />
      </div>

      {showNewsBox && (
        <div
          style={{
            position: 'absolute',
            
            right: '1vw', 
            top: '3.8vw', 
            width: '20vw', 
            height: '70vh', 
            backgroundColor: '#0066b2',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            padding: '1vw',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2>News Feed</h2>
        
        </div>
      )}
    </Box>
  );
};

export default Navbar;
