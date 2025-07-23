import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import { ToastContainer } from 'react-toastify';
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardContent from "./pages/Dashboard/Dashboard";
import ShowcaseContent from "./pages/ShowCase/ShowCaseContent";
// import ShowcaseContent from "./components/ShowcaseContent";
// import các component còn lại tương tự...

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
            <Route path="Showcase" element={<ShowcaseContent/>} />
            <Route path="Bookings" element={<div className="p-6">Bookings</div>} />
            <Route path="Contacts" element={<div className="p-6">Contacts</div>} />
            <Route path="Appointment" element={<div className="p-6">Appointment</div>} />
            <Route path="Approval" element={<div className="p-6">Approval</div>} />
            <Route path="Enquiry" element={<div className="p-6">Enquiry</div>} />
            {/* Thêm route con tương ứng */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
