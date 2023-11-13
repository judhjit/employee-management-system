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
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Timeline from "./components/Timeline"
import ViewAllAdmin from "./components/admin/ViewAllAdmin";

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
        isUser={isUser}
        isNewsadmin={isNewsadmin}
      />

      <div className="App" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 1,justifyContent:'space-between',width:'100vw'
          }}
        >
          <Routes>

          <Route path="/" element={<LandingPage  showNewsFeed={showNewsFeed}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            user={user}
            setUser={setUser}/>}/>
          <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates}/>}/>
          <Route path="/cabbooking" element={<CabBooking/>}/>
          {/* <Route path="multidatecalendar" element={<MultiDateCalendar
            showNewsFeed={showNewsFeed}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            user={user}
            setUser={setUser}
          />}/> */}
          {/* <Route path="multidatecalendar" element={<MultiDateCalendar />}/> */}
          <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates}/>} />  
          <Route path="/grantaccess" element={<GrantAccess/>}/>        
          <Route path="/requests" element={<Requests/>}/>               
          <Route path="/login" element={<Login/>}/>               
          <Route path="/signup" element={<Signup/>}/>               
          <Route path="/analytics" element={<Analytics/>}/>        
          <Route path="/profile" element={<Profile/>}/>    
          <Route path="/viewAllAdmin" element={<ViewAllAdmin/>}/>
          <Route path="/timeline" element={<Timeline selectedDates={selectedDates}/>}/>   
          <Route path="/newsfeed" element={<NewsFeed isUser={isUser} isNewsadmin={isNewsadmin}/>}/>            

          </Routes>
          
          {/* {showNewsFeed && (
            <div
              style={{
                width: "290px",
                backgroundColor: "#12184c",
                overflowY: "auto",
                height:"805px"
              }}
            >
              <NewsFeed style={{ height: "100%" }} isUser={isUser} isNewsadmin={isNewsadmin}/>
            </div>
            
          )} */}
          
        </div>
      
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
