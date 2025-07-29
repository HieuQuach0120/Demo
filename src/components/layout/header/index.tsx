import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function HeaderComponent() {
  const allItems = [
    { label: "Member Management", url: "/member" },
    { label: "Event Management", url: "/event" },
    { label: "Event Register", url: "/event/register-search" },
    { label: "Configuration Management", url: "/configuration" },
  ];
  const home = { icon: "pi pi-home", url: "/event" };

  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef<any>(null);

  const menuItems = [
  {
    label: "Cập nhật thông tin",
    icon: "pi pi-user-edit",
    command: () => navigate("/profile"),
  },
  {
    label: "Đổi mật khẩu",
    icon: "pi pi-cog",
  },
  {
    label: "Đăng xuất",
    icon: "pi pi-fw pi-sign-in",
    command: () => {
      localStorage.clear();
      navigate("/login");
    },
  },
];

  const renderLabel = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return <h2>Tổng quan</h2>;
      case "/detail":
        return <h2>Chi tiết</h2>;
      case "/member":
        return <h2>Thành viên</h2>;
      case "/weather":
        return <h2>Thời tiết</h2>;
      case "/profile":
        return <h2>Thông tin người dùng</h2>;
      default:
        return <></>;
    }
  };

  return (
    <div className="ad-layout-topbar h-100 d-flex align-items-center justify-content-between px-4">
      {/* Nếu bạn muốn dùng BreadCrumb thì mở comment dưới đây */}
      {/* <>
        {items && items.length > 0 && <BreadCrumb model={items} home={home} />}
      </> */}
      {renderLabel()}
      <div className="icons position-relative">
        <i
          className="pi pi-user"
          style={{ cursor: "pointer", fontSize: "1.4rem" }}
          onClick={(e) => menuRef.current?.toggle(e)}
        />
        <Menu model={menuItems} popup ref={menuRef} />
      </div>
    </div>
  );
}
