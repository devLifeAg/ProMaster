import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { KeepAlive, AliveScope } from 'react-activation';
import { useState } from "react";
import Login from "./pages/LoginPage/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardContent from "./pages/Dashboard/Dashboard";
import ShowcaseContent from "./pages/ShowCase/ShowCaseContent";

import { UserContext} from './contexts/UserContext';

import type { UserProfile } from "./models/DashboardData";
function App() {
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  return (
    <>
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <ToastContainer />
      <BrowserRouter basename="/ProMaster/">
        <AliveScope>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/Dashboard"
              element={<DashboardLayout />}
            >
              <Route
                index
                element={
                  <KeepAlive cacheKey="Dashboard">
                    <DashboardContent />
                  </KeepAlive>
                }
              />
              <Route
                path="Showcase"
                element={
                  <KeepAlive cacheKey="Showcase">
                    <ShowcaseContent />
                  </KeepAlive>
                }
              />
              <Route
                path="Bookings"
                element={
                  <KeepAlive cacheKey="Bookings">
                    <div className="p-6">Bookings</div>
                  </KeepAlive>
                }
              />
              <Route path="Contacts" element={<div className="p-6">Contacts</div>} />
              <Route path="Appointment" element={<div className="p-6">Appointment</div>} />
              <Route path="Approval" element={<div className="p-6">Approval</div>} />
              <Route path="Enquiry" element={<div className="p-6">Enquiry</div>} />
            </Route>
          </Routes>
        </AliveScope>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}


export default App;
