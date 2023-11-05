import { useState } from "react";
import "./App.css";

import MultiDateCalendar from "./components/MultiDateCalendar";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeskBooking from "./components/DeskBooking";
import CabBooking from "./components/CabBooking";

import CurrentBookings from "./components/CurrentBookings";
import LunchAndCabbook from "./components/LunchAndCabbook";
import GrantAccess from "./components/admin/GrantAccess";
import Requests from "./components/admin/Requests";
import Analytics from "./components/admin/Analytics";

function App() {
  const [showNewsFeed, setShowNewsFeed] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isAdmin,setIsAdmin] = useState(true);
  const [isUser,setisUser] = useState(false);
  const [isNewsadmin,setNewsadmin] = useState(false);
  const [user,setUser]=useState({empId:"",
  empName:"",
selectedDate:[],
selectedSeat:[],
cabSlot:[],
meal:[]}) 
  return (
    <BrowserRouter>
    <div>

      <Navbar 
        selectedDates={selectedDates}
        showNewsFeed={showNewsFeed}
        setShowNewsFeed={setShowNewsFeed}

        isAdmin={isAdmin}
        
      />

      <div className="App" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 1,justifyContent:'space-between',width:'100vw'
          }}
        >
          <Routes>

            <Route path="/" element={<MultiDateCalendar
            showNewsFeed={showNewsFeed}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            user={user}
            setUser={setUser}
          />}/>
          <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates}/>}/>
          <Route path="/cabbooking" element={<CabBooking/>}/>
          
          <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates}/>} />  
          <Route path="/grantaccess" element={<GrantAccess/>}/>        
          <Route path="/requests" element={<Requests/>}/>        
          <Route path="/analytics" element={<Analytics/>}/>        

          </Routes>
          
          {showNewsFeed && (
            <div
              style={{
                width: "350px",
                backgroundColor: "#12184c",
                overflowY: "auto",
                height:"805px"
              }}
            >
              <NewsFeed style={{ height: "100%" }} isNewsadmin={isNewsadmin}/>
            </div>
            
          )}
          
        </div>
      
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
