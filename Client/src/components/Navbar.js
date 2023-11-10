



import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import './Navbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

library.add(faUser, faNewspaper);

const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin, nightLight, setNightLight }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUserMenuOpen(true);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
    setUserMenuOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5vw',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <div>
          {isAdmin && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="contained" onClick={() => navigate("/requests")}>
                Requests
              </Button>
              <Button variant="contained" onClick={() => navigate("/grantaccess")}>
                Grant Access
              </Button>
              <Button variant="contained" onClick={() => navigate('/analytics')}>Analytics</Button>
            </div>
          )}
        </div>
        {/* {
          nightLight ? (<Button onClick={()=>setNightLight(!nightLight)}>Light</Button>)
            : (<Button onClick={()=>setNightLight(!nightLight)}>Night</Button>)
        } */}
        <FontAwesomeIcon
          icon={faNewspaper}
          size="2x"
          style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }}
          onClick={() => setShowNewsFeed(!showNewsFeed)}
        />
        <FontAwesomeIcon
          icon={faUser}
          size="2x"
          style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }}
          onClick={handleUserIconClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={userMenuOpen}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Navbar;



