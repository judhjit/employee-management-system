import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../assets/Logo.png";
import { styled } from "@mui/system";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
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
    color: "black",
    fontWeight:'bold',
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
                fontFamily: "poppins",
                color: "grey",
              }}
            >
             
                {/* <HomeSharpIcon style={{height:'34px'}}/> */}
                <CustomTextButton
                  variant="text"
                  onClick={() => navigate("/dashboard")}
                  style={{
                    fontFamily: "poppins",
                    fontSize: "15px",
                    letterSpacing: "2px",
                    color:
                      location.pathname === "/dashboard"
                        ? activeStyle.color
                        : "grey",
                  }}
                >
                  HOME
                </CustomTextButton>
             

              {isAdmin && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: "15px",
                    letterSpacing: "2px",
                  }}
                >
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/requests")}
                    style={{
                      fontFamily: "poppins",
                      fontSize: "15px",
                      letterSpacing: "2px",
                      color:
                      location.pathname === "/requests"
                        ? activeStyle.color
                        : "grey",
                    }}
                  >
                    BOOKINGS
                  </CustomTextButton>
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/analytics")}
                    style={{
                      fontFamily: "poppins",
                      fontSize: "15px",
                      letterSpacing: "2px",
                      color:
                      location.pathname === "/analytics"
                        ? activeStyle.color
                        : "grey",
                    }}
                  >
                    ADMIN ANALYTICS
                  </CustomTextButton>
                </div>
              )}
              {isUser && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/useranalytics")}
                    style={{
                      fontFamily: "poppins",
                      fontSize: "15px",
                      letterSpacing: "2px",
                      color:
                      location.pathname === "/useranalytics"
                        ? activeStyle.color
                        : "grey",
                    }}
                  >
                    ANALYTICS
                  </CustomTextButton>

                  <CustomTextButton
                    variant="text"
                    onClick={() => navigate("/userholidaylist")}
                    style={{
                      fontFamily: "poppins",
                      fontSize: "15px",
                      letterSpacing: "2px",
                      color:
                      location.pathname === "/userholidaylist"
                        ? activeStyle.color
                        : "grey",
                    }}
                  >
                    HOLIDAY LIST
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
                style={{
                  fontFamily: "poppins",
                  fontSize: "15px",
                  letterSpacing: "2px",
                  color:
                      location.pathname === "/profile"
                        ? activeStyle.color
                        : "grey",
                }}
              >
                PROFILE
              </CustomTextButton>
              <CustomTextButton
                variant="text"
                onClick={handleLogout}
                style={{
                  fontFamily: "poppins",
                  fontSize: "15px",
                  letterSpacing: "2.5px",
                  color: "grey",
                }}
              >
                LOGOUT
              </CustomTextButton>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
};

export default Sidebar;
