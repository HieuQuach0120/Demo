import { NavLink } from "react-router-dom";
// import { logout } from "../../service/AuthenService";
import { useForm } from "react-hook-form";
// import { checkPermission } from "../../common";
// import { ROLE } from "../../common/constant";
// import ChangePassWord from './ChangePassword'
import { useState } from "react";
export default function SidebarComponent() {
  const [showDialog, setShowDialog] = useState(false);
  const onHide = () => {
    setShowDialog(false);
  };
  return (
    <>
      <div className="nav-logo"></div>
      {/* {showDialog && (
        <ChangePassWord
          onHide={onHide}
        />
      )} */}
      <ul className="nav-menu">
        <li>
          <NavLink to={"/"}>
            <i className="pi pi-chart-bar"></i> Tổng quan
          </NavLink>
        </li>
        {/* {checkPermission(ROLE.ADMIN) && ( */}
        <li>
          <NavLink to={"/detail"}>
            <i className="pi pi-info-circle"></i> Xem chi tiết
          </NavLink>
        </li>
        <li>
          <NavLink to={"/member"}>
            <i className="pi pi-users"></i> Thành viên
          </NavLink>
        </li>
        <li>
          <NavLink to={"/weather"}>
            <i className="bi bi-cloud-drizzle"></i> Thời tiết
          </NavLink>
        </li>
        {/* <li>
            <NavLink to={"/membership"}>
              <i className="pi pi-user-plus font-size-icon"></i> Membership
              Management
            </NavLink>
          </li>
          <li>
            <NavLink to={"/configuration"}>
              <i className="pi pi-cog font-size-icon"></i> Configuration
              Management
            </NavLink>
          </li> */}
        {/* )} */}
      </ul>
      <ul className="nav-menu logout">
        <li>
          <div
            className="pt-3 pe-3 pb-3"
            style={{ paddingLeft: "2rem" }}
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <i className="pi pi-cog font-size-icon me-2"></i>
            Đổi mật khẩu
          </div>
        </li>
        <li>
          <NavLink to={"/login"} onClick={() => localStorage.clear()}>
            <i className="pi pi-fw pi-sign-in"></i> Đăng xuất
          </NavLink>
        </li>
      </ul>
    </>
  );
}
