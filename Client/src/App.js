

import { useEffect, useState } from "react";
import "./App.css";

import MultiDateCalendar from "./components/MultiDateCalendar";
// import Navbar from "./components/Navbar";
// import NewsFeed from "./components/NewsFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DeskBooking from "./components/DeskBooking";

// import Stepper from "./components/Stepper";

import CurrentBookings from "./components/CurrentBookings";
import LunchAndCabbook from "./components/LunchAndCabbook";
// import GrantAccess from "./components/admin/GrantAccess";
import Requests from "./components/admin/Requests";
import Analytics from "./components/admin/Analytics";
// import ViewAllAdmin from "./components/admin/ViewAllAdmin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import Bookings from "./components/Bookings";
import Profile from "./components/Profile";
import UserAnalytics from "./components/UserAnalytics";
import Holiday from "./components/admin/Holiday";
import HolidayListUser from "./components/HolidayListUser";
import api from "./api";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

// import io from "socket.io-client";


function App() {
  // const socket = io("http://localhost:3001");
  // const [showNewsFeed, setShowNewsFeed] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [nightLight, setNightLight] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [user, setUser] = useState({
    email: '',
    userId: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    // isNewsAdmin: false,
    expiry: '',
  });

  const [bookings, setBookings] = useState({
    dates: [],
    // deskId: [],
    // workSlot: [],
    preference: [],
    // isDeskRequired: true,
    // isCabRequired: false,
    isFoodRequired: false,
  })

  const refresh = async () => {
    // const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await api.post('/refresh');
      const now = new Date();
      const { accessToken, ttl } = response.data;
      const ttlNum = Number(ttl) * 1000;
      const expiry = now.getTime() + ttlNum;
      user.expiry = expiry;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setisUser(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId && user.userId !== '') {
      const now = new Date();
      const expiry = Number(user.expiry);
      if (now.getTime() > expiry) {
        refresh();
      } else {
        setUser(user);
        setisUser(true);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div>

        {/* {isUser && <Navbar
          // showNewsFeed={showNewsFeed}
          // setShowNewsFeed={setShowNewsFeed}
          isAdmin={user.isAdmin}
          isUser={isUser}
          // isNewsadmin={user.isNewsAdmin}
          bookings={bookings}
          setBookings={setBookings}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />} */}
        {isUser && <Sidebar
          // showNewsFeed={showNewsFeed}
          // setShowNewsFeed={setShowNewsFeed}
          isAdmin={user.isAdmin}
          isUser={isUser}
          // isNewsadmin={user.isNewsAdmin}
        />}

        <div className="App" style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flex: 1, justifyContent: 'space-between', width: '100vw'
            }}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Login
                  // setShowNewsFeed={setShowNewsFeed}
                  // showNewsFeed={showNewsFeed}
                  isUser={isUser}
                  setisUser={setisUser}
                  setUser={setUser}
                />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login
                  // setShowNewsFeed={setShowNewsFeed}
                  // showNewsFeed={showNewsFeed}
                  isUser={isUser}
                  setisUser={setisUser}
                  setUser={setUser}
                />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path='/dashboard' element ={<Dashboard 
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              isAdmin={user.isAdmin}
              isUser={isUser}
              bookings={bookings}
              setBookings={setBookings}
              setUser={setUser}/>}/>
              
              <Route path="/landingpage" element={<MultiDateCalendar
                // showNewsFeed={showNewsFeed}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                user={user}
                setUser={setUser}
                isUser={isUser}
                bookings={bookings}
                setBookings={setBookings}
                // socket={socket}
              />} />
              {/* <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates} bookings={bookings} setBookings={setBookings} />} /> */}
              {/* <Route path="/cabbooking" element={<CabBooking/>}/> */}

              <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates} bookings={bookings} setBookings={setBookings} />} />
              {/* <Route path="/grantaccess" element={<GrantAccess />} /> */}
              <Route path="/requests" element={<Requests />} />
              <Route path="/sidebar" element={<Sidebar  isAdmin={user.isAdmin}
          isUser={isUser} />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/useranalytics" element={<UserAnalytics />} />
              <Route path="/holidays" element={<Holiday />} />
              <Route path="/userholidaylist" element={<HolidayListUser isAdmin={user.isAdmin} />} />
              {/* <Route path="/viewAllAdmin" element={<ViewAllAdmin />} /> */}
              <Route path="/bookings" element={<Bookings selectedDates={selectedDates} bookings={bookings} setBookings={setBookings} userId={user.user} />} />
              <Route path="/profile" element={<Profile user={user} isUser={isUser} />} />
              {/* <Route path="/currentbookings" element={<CurrentBookings />} /> */}
            </Routes>

            {/* {showNewsFeed && (
              <div
                style={{
                  width: "370px",
                  backgroundColor: "#004B81",
                  overflowY: "auto",
                  height: "700px",
                  zIndex: 2,
                  position: "relative"

                }}
              >
                <NewsFeed style={{ height: "100%" }} userId={user.userId} isNewsadmin={user.isNewsAdmin} isAdmin={user.isAdmin} socket={socket} />
              </div>

            )} */}

          </div>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;
