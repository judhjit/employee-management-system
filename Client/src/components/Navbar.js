


import React, { useState } from "react";
import Divider from '@mui/material/Divider';

import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faNewspaper,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NewsFeed from "./NewsFeed";
import Popover from "@mui/material/Popover";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from '@mui/system';

import api from "../api";

library.add(faNewspaper, faSignOutAlt, faUserCircle);

const Navbar = ({
  showNewsFeed,
  setShowNewsFeed,
  isAdmin,
  isUser,
  isNewsadmin,
}) => {
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
    // setNewspaperAnchorEl(event.currentTarget);
    setShowNewsFeed(!showNewsFeed)
  };

  const closePopover = () => {
    setNewspaperAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "/";
    // navigate("/");
  };

  const handleNewsAdminRequest = async () => {
    let response;
    try {
      response = await api.post('/user/requestnewsadminaccess');
      console.log(response.data);
      // alert("News Admin Access Request Sent Successfully");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const CustomTextButton = styled(Button)(({ theme }) => ({
    color: 'black',
    fontSize: '20px',
    textTransform: 'none',
    fontWeight: 550,
    '&:hover': {
      color: '#0071BA',
      backgroundColor: 'transparent',

    },
  }));

  return (
    <div>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "white", boxShadow: "none", height: '50px', fontFamily: 'poppins' }}
      >
        <Toolbar>

          <div style={{ display: "flex", gap: "17px", margin: "10px", paddingLeft: '50px' }}>
            {isAdmin && (
              <div>
                <CustomTextButton
                  variant="text"
                  onClick={() => navigate("/requests")}
                  style={{ fontFamily: 'poppins' }}
                >
                  Bookings
                </CustomTextButton>
                <CustomTextButton
                  variant="text"
                  onClick={() => navigate("/grantaccess")}
                  style={{ fontFamily: 'poppins', paddingLeft: '32px' }}
                >
                  Grant Access
                </CustomTextButton>
                <CustomTextButton
                  variant="text"
                  onClick={() => navigate("/analytics")}
                  style={{ fontFamily: 'poppins', paddingLeft: '32px' }}
                >
                  Admin Analytics
                </CustomTextButton>
              </div>
            )}
          </div>
          {isUser && (
            <div>
              <CustomTextButton
                variant="text"
                onClick={() => navigate("/useranalytics")}
                style={{ fontFamily: 'poppins', paddingLeft: '32px' }}
              >
                Analytics
              </CustomTextButton>
            </div>
          )}
          {isUser && !isAdmin && !isNewsadmin && (
            <div>
              <CustomTextButton
                variant="text"
                onClick={handleNewsAdminRequest}
                style={{ fontFamily: 'poppins', paddingLeft: '32px' }}
              >
                Request News Admin Access
              </CustomTextButton>
            </div>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            <IconButton onClick={togglePopover}>
              <FontAwesomeIcon
                icon={faNewspaper}
                size="2x"
                style={{ height: "1.5vw", width: "1.5vw" }}
              />
            </IconButton>
            <IconButton onClick={handleOpenMenu}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                style={{ height: "1.5vw", width: "1.5vw" }}
              />
            </IconButton>
          </div>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} to="/profile">
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ marginRight: "8px" }}
              />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "8px" }}
              />
              Logout
            </MenuItem>
          </Menu>

          {/* <Popover
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
          </Popover> */}
        </Toolbar>
      </AppBar>


      <Divider />


    </div>
  );
};

export default Navbar;


