import React from 'react';
import './Layout.css';
import Login from './Login';
import bg from '../assets/bgimg2.svg'
import { Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <div className="shared-background">
      <div className="left-half">
        
        <img src={bg} alt="Left Half Image" />
      </div>
      <div className="right-half" >
        <div className="forms-container">
         
          {/* Child routes will be rendered here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
