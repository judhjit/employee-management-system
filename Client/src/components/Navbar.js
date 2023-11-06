



import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import './Navbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

library.add(faUser, faNewspaper);

const Navbar = ({ showNewsFeed, setShowNewsFeed, isAdmin }) => {
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
              <Button variant="contained">Analytics</Button>
            </div>
          )}
        </div>
        <FontAwesomeIcon
          icon={faNewspaper}
          size="2x"
          style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }}
         
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



// import React, { useEffect } from 'react';
// import { Box, Button } from '@mui/material';
// import './Navbar.css';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import IconButton from "";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// library.add(faUser, faNewspaper);

// const Navbar = ({showNewsFeed,setShowNewsFeed ,isAdmin}) => {

//   const navigate=useNavigate();
//     // const [showNewsFeed,setShowNewsFeed]=useState(true);
//     const handleNewsFeed =() =>{
//         setShowNewsFeed(!showNewsFeed);
//         console.log("newsFeed",showNewsFeed);
//         // return showNewsFeed;
//     }

//     // useEffect(()=>{
//     //     return showNewsFeed
//     // },[showNewsFeed])



//     const dummyMenuItems = [
//       {
//         title: "Add Item"
//       },
//       {
//         title: "Move Item"
//       },
//       {
//         title: "Delete Item"
//       }
//     ];
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const handleClick = e => {
//       setAnchorEl(e.currentTarget);
//     };
//     const handleClose = () => {
//       setAnchorEl(null);
//     };
  
//     const nativeOnChange = e => {
//       const detail = {
//         selectedIndex: e.target.selectedIndex
//       };
//       e.target.selectedIndex = 0;
  
//       e.target.dispatchEvent(new CustomEvent("itemClick", { detail }));
//     };
  
//     const itemClick = e => {
//       console.log("Item Clicked " + e.detail);
//     };

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
//       {/* <div>
//         <img src={cme} alt="CME Logo" style={{ width: '18vw', padding: '0.5vw' }} />
//       </div> */}

//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           width: '100%',
//         }}
//       >
//         <div >
//           {isAdmin && (
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Button variant="contained" onClick={()=>navigate("/requests")} >Requests</Button>
//               <Button variant="contained" onClick={()=>navigate("/grantaccess")}>Grant Access</Button>
//               <Button variant="contained" >Analytics</Button>
              

//               </div>
//           )}
//         </div>
//         <FontAwesomeIcon icon={faNewspaper} size="2x" style={{ paddingLeft: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={handleNewsFeed} />
        
//         <IconButton
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//         aria-label="Open to show more"
//         title="Open to show more"
//       >
//         <FontAwesomeIcon icon={faUser} size="2x" style={{ padding: '2vw', height: '1.5vw', width: '1.5vw' }} onClick={handleClick} />
//         </IconButton>
//         <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         {dummyMenuItems.map(item => (
//           <MenuItem onClick={handleClose} key={item.title} value={item.title}>
//             {item.title}
//           </MenuItem>
//         ))}
//       </Menu>
      
//       </div>
//     </Box>
//   );
// };
// export default Navbar;
