import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { KeepAlive, AliveScope } from 'react-activation';
import { useState } from "react";

// Page imports
import Login from "./pages/LoginPage/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardContent from "./pages/Dashboard/Dashboard";
import ShowcaseContent from "./pages/ShowCase/ShowCaseContent";

// Component imports
import MobileNoticeModal from "./components/feedback/MobileNoticeModal";

// Context imports
import { UserContext } from './contexts/UserContext';

// Type imports
import type { UserProfile } from "./types/DashboardData";

/**
 * Main application component that handles routing and global state
 * Provides user context and toast notifications across the app
 */
function App() {
  // Global user state for authentication and user data
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {/* Global toast notifications container */}
      <ToastContainer />
      
      {/* Router configuration with GitHub Pages basename */}
      <BrowserRouter basename="/ProMaster/">
        <AliveScope>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            
            {/* Protected dashboard routes with layout wrapper */}
            <Route path="/Dashboard" element={<DashboardLayout />}>
              {/* Main dashboard page with keep-alive for performance */}
              <Route
                index
                element={
                  <KeepAlive cacheKey="Dashboard">
                    <DashboardContent />
                  </KeepAlive>
                }
              />
              
              {/* Showcase page with keep-alive for smooth navigation */}
              <Route
                path="Showcase"
                element={
                  <KeepAlive cacheKey="Showcase">
                    <ShowcaseContent />
                  </KeepAlive>
                }
              />
              
              {/* Placeholder routes for future features */}
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
      
      {/* Mobile notice modal for responsive design */}
      <MobileNoticeModal />
    </UserContext.Provider>
  );
}

export default App;
