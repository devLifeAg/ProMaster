import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/LoginPage/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Bạn có thể thêm các route khác ở đây nếu cần */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
