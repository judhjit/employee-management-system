import React from "react";
const navbarStyle = {
  display: "flex",
  alignItems: "center",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)", 
  background: "rgba(255, 255, 255, 0.6)", 
  padding: "10px", 
  
};

function Navbar() {
  return (
    <div style={navbarStyle}>
      <h2 style={{color:'black', fontSize:'20px'}}>ABC Group</h2>
    </div>
  );
}
export default Navbar;
