import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem} from '@mui/material';
import './Navbar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faNewspaper, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';


library.add(faNewspaper, faSignOutAlt, faUserCircle);

const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /*for logout*/
  const handleLogout = () => {
    
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
              <Button variant="contained" onClick={() => navigate('/requests')}>Requests</Button>
              <Button variant="contained" onClick={() => navigate('/grantaccess')}>Grant Access</Button>
              <Button variant="contained" onClick={() => navigate('/analytics')}>Analytics</Button>
            </div>
          )}
        </div>
        <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={() => setShowNewsFeed(!showNewsFeed)} />
        <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={handleOpenMenu} />
        
      
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem>
            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Navbar;
