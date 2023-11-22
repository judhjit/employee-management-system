import { useEffect, useState } from "react";
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
import UserAnalytics from "./components/UserAnalytics";
import api from "./api";

import io from "socket.io-client";


function App() {
  const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"]
  });
  const [showNewsFeed, setShowNewsFeed] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [nightLight, setNightLight] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [user, setUser] = useState({
    email: '',
    userId: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    isNewsAdmin: false,
    expiry: '',
  });

  const refresh = async () => {
    // const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    try{
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

        {isUser && <Navbar
          showNewsFeed={showNewsFeed}
          setShowNewsFeed={setShowNewsFeed}
          isAdmin={user.isAdmin}
          isUser={isUser}
          isNewsadmin={user.isNewsAdmin}
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
                  setShowNewsFeed={setShowNewsFeed}
                  showNewsFeed={showNewsFeed}
                  isUser={isUser}
                  setisUser={setisUser}
                  setUser={setUser}
                />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login
                  setShowNewsFeed={setShowNewsFeed}
                  showNewsFeed={showNewsFeed}
                  isUser={isUser}
                  setisUser={setisUser}
                  setUser={setUser}
                />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/landingpage" element={<MultiDateCalendar
                showNewsFeed={showNewsFeed}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                user={user}
                setUser={setUser}
                isUser={isUser}
              />} />
              <Route path="/deskbooking" element={<DeskBooking selectedDates={selectedDates} />} />
              {/* <Route path="/cabbooking" element={<CabBooking/>}/> */}

              <Route path="/lunchandcabbook" element={<LunchAndCabbook selectedDates={selectedDates} />} />
              <Route path="/grantaccess" element={<GrantAccess />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/useranalytics" element={<UserAnalytics />} />
              <Route path="/viewAllAdmin" element={<ViewAllAdmin />} />
              <Route path="/bookings" element={<Bookings selectedDates={selectedDates} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              {/* <Route path="/currentbookings" element={<CurrentBookings />} /> */}
            </Routes>

            {showNewsFeed && (
              <div
                style={{
                  width: "370px",
                  backgroundColor: "#004B81",
                  overflowY: "auto",
                  height: "664px"
                }}
              >
                <NewsFeed style={{ height: "100%" }} isNewsadmin={user.isNewsAdmin} isAdmin={user.isAdmin} socket={socket}/>
              </div>

            )}

          </div>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;
