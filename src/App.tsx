import React from "react";
import { createContext, useState } from "react";
import "./App.css";
import "../src/acess/css/layout.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// --- 1. THÊM IMPORT NÀY ---
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Quan trọng: Không có cái này thông báo sẽ bị vỡ hình
// -------------------------

import Login from "./components/login";
import Register from "./components/register";
import ChangePassword from "./components/change-password";
import { ProgressSpinner } from "primereact/progressspinner";
import { privateRoutes } from "./route/index";
import LayoutComponent from "./components/layout";

export const AppContext = createContext<any>(null);

function App() {
  const [spinner, setSpinner] = useState(false);

  const progressspinner = () => {
    return (
      <div className="progress-spinner">
        <ProgressSpinner strokeWidth="3" />
      </div>
    );
  };

  return (
    <div className="App">
      {/* --- 2. ĐẶT TOAST CONTAINER Ở ĐÂY --- */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Thêm màu sắc cho đẹp (xanh/đỏ)
      />
      {/* ---------------------------------- */}

      {spinner && progressspinner()}

      <AppContext.Provider value={{ spinner, setSpinner }}>
        <Router>
          <Routes>
            {/* Đã xóa bớt ngoặc nhọn thừa cho code gọn */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<LayoutComponent />}>
              <Route path="/change-password" element={<ChangePassword />} />
              {privateRoutes.map((route, index) => {
                return <React.Fragment key={index}>{route}</React.Fragment>;
              })}
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
