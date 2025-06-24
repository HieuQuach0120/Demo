import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../acess/css/layout.css";
import HeaderComponent from "./header/index";
import SidebarComponent from "./siderbar/index";
export default function LayoutComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="layout-container">
        <div className="layout-sidebar">
          <SidebarComponent></SidebarComponent>
        </div>
        <div className="layout-content-wrapper">
          <HeaderComponent></HeaderComponent>
          <div className="layout-content-main card">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
