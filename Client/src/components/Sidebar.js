import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../assets/Logo.png";
import { styled } from "@mui/system";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomTextButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontSize: "20px",
  textTransform: "none",
  fontWeight: 550,
  "&:hover": {
    color: "#0071BA",
    backgroundColor: "transparent",
  },
}));

const Sidebar = ({ isAdmin, isUser }) => {
  const navigate = useNavigate();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setProfileAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    // navigate("/");
  };
  const activeStyle = {
    color: "#0071BA", 
  };
  return (
    <div>
      <main className="main">
        <aside className="sidebar">
          <nav className="nav">
            <img className="logo" src={logo} alt="Logo" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "85px",
                
                alignItems: "flex-start",
                fontFamily:'poppins',
                color:'grey'
              }}
            >
              <CustomTextButton
                variant="text"
                onClick={() => navigate("/dashboard")}
                style={{ fontFamily: "poppins",fontSize:'15px' ,letterSpacing:'2px',color:'grey'}}
              >
                Home
              </CustomTextButton>
              {isAdmin && (
                <div style={{display: "flex",
                flexDirection: "column", alignItems:'flex-start',fontSize:'15px' ,letterSpacing:'2px',color:'grey'}}>
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/requests")}
                    style={{ fontFamily: "poppins" ,fontSize:'15px' ,letterSpacing:'2px',color:'grey'}}
                  >
                    Bookings
                  </CustomTextButton>
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/analytics")}
                    style={{ fontFamily: "poppins",fontSize:'15px',letterSpacing:'2px' ,color:'grey' }}
                  >
                    Admin Analytics
                  </CustomTextButton>
                </div>
              )}
              {isUser && (
                <div style={{display: "flex",
                flexDirection: "column", alignItems:'flex-start'}}>
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/useranalytics")}
                    style={{ fontFamily: "poppins",fontSize:'15px',letterSpacing:'2px',color:'grey' }}
                  >
                    Analytics
                  </CustomTextButton>

                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/userholidaylist")}
                    style={{ fontFamily: "poppins",fontSize:'15px',letterSpacing:'2px',color:'grey' }}
                  >
                    Holiday List
                  </CustomTextButton>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "auto",
              }}
            >
              <CustomTextButton
                variant="text"
                component={Link}
                to="/profile"
                style={{ fontFamily: "poppins" ,fontSize:'15px',letterSpacing:'2px' ,color:'grey'}}
              >
                Profile
              </CustomTextButton>
              <CustomTextButton
                variant="text"
                onClick={handleLogout}
                style={{ fontFamily: "poppins" ,fontSize:'15px',letterSpacing:'2.5px',color:'grey' }}
              >
                Logout
              </CustomTextButton>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
};

export default Sidebar;