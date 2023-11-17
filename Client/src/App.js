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

import MultiDateCalendar from "./components/MultiDateCalendar";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeskBooking from "./components/DeskBooking";

// import Stepper from "./components/Stepper";

import CurrentBookings from "./components/CurrentBookings";
import LunchAndCabbook from "./components/LunchAndCabbook";
import GrantAccess from "./components/admin/GrantAccess";
import Requests from "./components/admin/Requests";
import Analytics from "./components/admin/Analytics";
import ViewAllAdmin from "./components/admin/ViewAllAdmin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import Bookings from "./components/Bookings";
import Profile from "./components/Profile";

import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  const [showNewsFeed, setShowNewsFeed] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);

  const [isAdmin,setIsAdmin] = useState(true);
  const [isNewsadmin,setNewsadmin] = useState(true);
  const [nightLight,setNightLight] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [user,setUser]=useState({empId:"",
  empName:"",
selectedDate:[],
selectedSeat:[],
cabSlot:[],
meal:[]}) 
  return (
    <BrowserRouter>
    <div >

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
          <Route path="/" element={<Layout />}>
                <Route index element={<Login setShowNewsFeed={setShowNewsFeed} showNewsFeed={showNewsFeed}/>} />
                <Route path="signup" element={<Signup />} />
              </Route>
            <Route path="/landingpage" element={<MultiDateCalendar
            showNewsFeed={showNewsFeed}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            user={user}
            setUser={setUser}
          />}/>
          <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates}/>}/>
          {/* <Route path="/cabbooking" element={<CabBooking/>}/> */}
          
          <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates}/>} />  
         
          <Route path="/grantaccess" element={<GrantAccess/>}/>        
          <Route path="/requests" element={<Requests/>}/>        
          <Route path="/analytics" element={<Analytics/>}/>
          <Route path="/viewAllAdmin" element={<ViewAllAdmin/>} />
          <Route path="/bookings" element={<Bookings  selectedDates={selectedDates}/>} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
          
          {showNewsFeed && (
            <div
              style={{
                width: "370px",
                backgroundColor: "#004B81",
                overflowY: "auto",
                height:"664px"
              }}
            >
              <NewsFeed style={{ height: "100%" }} isNewsadmin={isNewsadmin}/>
            </div>
            
          )}
          

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
