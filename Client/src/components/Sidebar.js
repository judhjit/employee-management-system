import React from 'react'
import './Sidebar.css'
import logo from '../assets/Logo.png'
const Sidebar = () => {
  return (
    <div><main class="main">
    <aside class="sidebar">
      <nav class="nav">
        <img className="logo"  src={logo}/>
        <ul style={{marginTop:'85px',fontSize:'13px'}}>
        <li class="active"><a href="#">Home</a></li>
          <li ><a href="#">Bookings</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Admin analytics</a></li>
          <li><a href="#">Holiday List</a></li>
          
        </ul>
      </nav>
    </aside>
  
    
  </main></div>
  );
}

export default Sidebar