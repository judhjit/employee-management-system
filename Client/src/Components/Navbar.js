// import React, { useState } from 'react';
// import { Box, Button, Menu, MenuItem, Drawer} from '@mui/material';
// import './Navbar.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faNewspaper, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import NewsFeed from "./NewsFeed";



// library.add(faNewspaper, faSignOutAlt, faUserCircle);

// const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin, isUser, isNewsadmin}) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);


//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };
//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

 
//   const handleLogout = () => {
    
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '0.5vw',
//         backgroundColor: 'white',
//       }}
//     >
     

//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           width: '100%',
//         }}
//       >
//         <div>
//           {isAdmin && (
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Button variant="contained" onClick={() => navigate('/requests')}>Requests</Button>
//               <Button variant="contained" onClick={() => navigate('/grantaccess')}>Grant Access</Button>
//               <Button variant="contained" onClick={() => navigate('/analytics')}>Analytics</Button>
//             </div>
//           )}
//           {isUser && !isAdmin && (
//             <div>
//               <Button variant="contained" onClick={() => navigate('/analytics')}>
//                 Analytics
//               </Button>
//             </div>
//           )}
//         </div>
//         <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={toggleDrawer} />
//         <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={handleOpenMenu} />
        
      
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//         >
//           <MenuItem component={Link} to="/profile">
//             <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
//             Profile
//           </MenuItem>
//           <MenuItem onClick={handleLogout}>
//             <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
//             Logout
//           </MenuItem>
//         </Menu>
//         <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
//         <NewsFeed isUser={isUser} isNewsadmin={isNewsadmin}/> 
//         </Drawer>
//       </div>
//     </Box>
//   );
// };

// export default Navbar;

// import React, { useState } from 'react';
// import { Box, Button, Menu, MenuItem, Drawer} from '@mui/material';
// import './Navbar.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faNewspaper, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import NewsFeed from "./NewsFeed";
// import Popover from '@mui/material/Popover';




// library.add(faNewspaper, faSignOutAlt, faUserCircle);

// const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin, isUser, isNewsadmin}) => {
//   const navigate = useNavigate();
//   const [newspaperAnchorEl, setNewspaperAnchorEl] = useState(null);
//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   // const [isDrawerOpen, setIsDrawerOpen] = useState(false);


//   const handleOpenMenu = (event) => {
//     setProfileAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setProfileAnchorEl(null);
//   };
//   const togglePopover = (event) => {
//     setNewspaperAnchorEl(event.currentTarget);
//   };
//   const closePopover = () => {
//     setNewspaperAnchorEl(null);
//   };
  
//   const handleLogout = () => {
    
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '0.5vw',
//         backgroundColor: 'white',
//       }}
//     >
     

//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           width: '100%',
//         }}
//       >
//         <div>
//           {isAdmin && (
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Button variant="contained" onClick={() => navigate('/requests')}>Requests</Button>
//               <Button variant="contained" onClick={() => navigate('/grantaccess')}>Grant Access</Button>
//               <Button variant="contained" onClick={() => navigate('/analytics')}>Analytics</Button>
//             </div>
//           )}
//           {isUser && !isAdmin && (
//             <div>
//               <Button variant="contained" onClick={() => navigate('/analytics')}>
//                 Analytics
//               </Button>
//             </div>
//           )}
//         </div>
//         <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={togglePopover} />
//         <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={handleOpenMenu} />
        
      
//         <Menu
//           anchorEl={profileAnchorEl}
//           open={Boolean(profileAnchorEl)}
//           onClose={handleCloseMenu}
//         >
//           <MenuItem component={Link} to="/profile">
//             <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
//             Profile
//           </MenuItem>
//           <MenuItem onClick={handleLogout}>
//             <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
//             Logout
//           </MenuItem>
//         </Menu>
//         <Popover
//   open={Boolean(newspaperAnchorEl)}
//   anchorEl={newspaperAnchorEl}
//   onClose={closePopover}
//   anchorOrigin={{
//     vertical: 'top',
//     horizontal: 'right', // Adjusted to 'right'
//   }}
//   transformOrigin={{
//     vertical: 'top',
//     horizontal: 'left', // Adjusted to 'left'
//   }}
  
  
// >
//   <NewsFeed isUser={isUser} isNewsadmin={isNewsadmin} />
// </Popover>
//       </div>
//     </Box>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faNewspaper, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NewsFeed from "./NewsFeed";
import Popover from '@mui/material/Popover';
import { AppBar, Toolbar, Typography } from '@mui/material';

library.add(faNewspaper, faSignOutAlt, faUserCircle);

const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin, isUser, isNewsadmin }) => {
  const navigate = useNavigate();
  const [newspaperAnchorEl, setNewspaperAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setProfileAnchorEl(null);
  };

  const togglePopover = (event) => {
    setNewspaperAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setNewspaperAnchorEl(null);
  };

  const handleLogout = () => {
    
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <div>
            {isAdmin && (
              <div style={{ display: 'flex', gap: '10px', margin:'10px'}}>
                <Button variant="contained" onClick={() => navigate('/requests')}>Requests</Button>
                <Button variant="contained" onClick={() => navigate('/grantaccess')}>Grant Access</Button>
                <Button variant="contained" onClick={() => navigate('/analytics')}>Analytics</Button>
              </div>
            )}
            {isUser && !isAdmin && (
              <div>
                <Button variant="contained" onClick={() => navigate('/analytics')}>
                  Analytics
                </Button>
              </div>
            )}
          </div>
          <IconButton onClick={togglePopover}>
            <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ height: '1.5vw', width: '1.5vw' }} />
          </IconButton>
          <IconButton onClick={handleOpenMenu}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ height: '1.5vw', width: '1.5vw' }} />
          </IconButton>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} to="/profile">
              <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
              Logout
            </MenuItem>
          </Menu>

          <Popover
            open={Boolean(newspaperAnchorEl)}
            anchorEl={newspaperAnchorEl}
            onClose={closePopover}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right', 
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left', 
            }}
          >
            <NewsFeed isUser={isUser} isNewsadmin={isNewsadmin} />
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

