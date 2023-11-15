// import { useState } from "react";
// import "./App.css";

// import MultiDateCalendar from "./components/MultiDateCalendar";
// import Navbar from "./components/Navbar";
// import NewsFeed from "./components/NewsFeed";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DeskBooking from "./components/DeskBooking";
// import CabBooking from "./components/CabBooking";
// // import Stepper from "./components/Stepper";

// import CurrentBookings from "./components/CurrentBookings";
// import LunchAndCabbook from "./components/LunchAndCabbook";
// import GrantAccess from "./components/admin/GrantAccess";
// import Requests from "./components/admin/Requests";
// import Analytics from "./components/admin/Analytics";
// import ViewAllAdmin from "./components/admin/ViewAllAdmin";

// function App() {
//   const [showNewsFeed, setShowNewsFeed] = useState(true);
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [isAdmin,setIsAdmin] = useState(true);
//   const [isNewsadmin,setNewsadmin] = useState(true);
//   const [nightLight,setNightLight] = useState(false);
//   const [user,setUser]=useState({empId:"",
//   empName:"",
// selectedDate:[],
// selectedSeat:[],
// cabSlot:[],
// meal:[]}) 
//   return (
//     <BrowserRouter>
//     <div >

//       <Navbar 
//         selectedDates={selectedDates}
//         showNewsFeed={showNewsFeed}
//         setShowNewsFeed={setShowNewsFeed}

//         isAdmin={isAdmin}
        
        
//       />

//       <div className="App" style={{ display: "flex" }}>
//         <div
//           style={{
//             display: "flex",
//             flex: 1,justifyContent:'space-between',width:'100vw'
//           }}
//         >
//           <Routes>

//             <Route path="/" element={<MultiDateCalendar
//             showNewsFeed={showNewsFeed}
//             selectedDates={selectedDates}
//             setSelectedDates={setSelectedDates}
//             user={user}
//             setUser={setUser}
//           />}/>
//           <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates}/>}/>
//           <Route path="/cabbooking" element={<CabBooking/>}/>
          
//           <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates}/>} />  
         
//           <Route path="/grantaccess" element={<GrantAccess/>}/>        
//           <Route path="/requests" element={<Requests/>}/>        
//           <Route path="/analytics" element={<Analytics/>}/>
//           <Route path="/viewAllAdmin" element={<ViewAllAdmin/>} />
//           </Routes>
          
//           {showNewsFeed && (
//             <div
//               style={{
//                 width: "350px",
//                 backgroundColor: "#004B81",
//                 overflowY: "auto",
//                 height:"805px"
//               }}
//             >
//               <NewsFeed style={{ height: "100%" }} isNewsadmin={isNewsadmin}/>
//             </div>
            
//           )}
          
//         </div>
      
//       </div>
//     </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import { useState } from "react";
import "./App.css";
import { Button, Popover, Typography } from "@mui/material";
import MultiDateCalendar from "./components/MultiDateCalendar";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DeskBooking from "./components/DeskBooking";
import CabBooking from "./components/CabBooking";
import CurrentBookings from "./components/CurrentBookings";
import LunchAndCabbook from "./components/LunchAndCabbook";
import GrantAccess from "./components/admin/GrantAccess";
import Requests from "./components/admin/Requests";
import Analytics from "./components/admin/Analytics";
import ViewAllAdmin from "./components/admin/ViewAllAdmin";

function App() {
   
    const [showNewsFeed, setShowNewsFeed] = useState(true);
    const [selectedDates, setSelectedDates] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isNewsadmin, setNewsadmin] = useState(true);
    const [nightLight, setNightLight] = useState(false);
    const [user, setUser] = useState({
      empId: "",
      empName: "",
      selectedDate: [],
      selectedSeat: [],
      cabSlot: [],
      meal: [],
    });
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
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
                flex: 1,
                justifyContent: "space-between",
                width: "100vw",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <MultiDateCalendar
                      showNewsFeed={showNewsFeed}
                      selectedDates={selectedDates}
                      setSelectedDates={setSelectedDates}
                      user={user}
                      setUser={setUser}
                    />
                  }
                />
                <Route
                  path="/deskbooking"
                  element={<DeskBooking selectedDates={selectedDates} />}
                />
                <Route
                  path="/cabbooking"
                  element={<CabBooking />}
                />
                <Route
                  path="/lunchandcabbook"
                  element={<LunchAndCabbook selectedDates={selectedDates} />}
                />
                <Route
                  path="/grantaccess"
                  element={
                    <div>
                      <Button onClick={handlePopoverOpen} style={{ color: "white" }}>
                        Open News Feed
                      </Button>
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <div style={{ padding: "10px" }}>
                          <Typography style={{ color: "black" }}>
                            News Feed
                          </Typography>
                          <NewsFeed
                            style={{ height: "400px", overflowY: "auto" }}
                            isNewsadmin={isNewsadmin}
                          />
                        </div>
                      </Popover>
                    </div>
                  }
                />
                <Route
                  path="/requests"
                  element={
                    <div>
                      <Button onClick={handlePopoverOpen} style={{ color: "white" }}>
                        Open News Feed
                      </Button>
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <div style={{ padding: "10px" }}>
                          <Typography style={{ color: "black" }}>
                            News Feed
                          </Typography>
                          <NewsFeed
                            style={{ height: "400px", overflowY: "auto" }}
                            isNewsadmin={isNewsadmin}
                          />
                        </div>
                      </Popover>
                    </div>
                  }
                />
                <Route path="/analytics" element={<Analytics/>}/>
          <Route path="/viewAllAdmin" element={<ViewAllAdmin/>} />
          </Routes>   
          {showNewsFeed && (
            <div
              style={{
                width: "350px",
                backgroundColor: "#004B81",
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