import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
// Import service
import { getUserProfile } from "../../../service/UserService";
import ModalUpdateProfile from "../../../components/modal/ModalUpdateProfile";

export default function HeaderComponent() {
  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null); // Thêm <any> để tránh lỗi typescript cơ bản

  const allItems = [
    { label: "Member Management", url: "/member" },
    { label: "Event Management", url: "/event" },
    { label: "Event Register", url: "/event/register-search" },
    { label: "Configuration Management", url: "/configuration" },
  ];
  const home = { icon: "pi pi-home", url: "/event" };

  const location = useLocation();

  const renderLable = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return <h2>Tổng quan</h2>;
      case "/detail":
        return <h2>Chi tiết</h2>;
      case "/member":
        return <h2>Thành viên</h2>;
      case "/admin":
        return <h2>Admin</h2>;
      default:
        return <></>;
    }
  };

  // 1. Tách hàm lấy dữ liệu ra riêng để tái sử dụng
  const fetchUserData = async () => {
    const data = await getUserProfile();
    if (data) {
      setUserInfo(data);
    }
  };

  // 2. Hàm xử lý khi click icon User -> Lấy dữ liệu rồi mới mở Modal
  const handleOpenProfile = async () => {
    await fetchUserData(); // Lấy dữ liệu mới nhất
    setShowProfile(true);
  };

  // 3. Hàm xử lý khi Update thành công (được gọi từ Modal)
  const handleUpdateSuccess = async () => {
    // Tải lại dữ liệu để Header cập nhật tên/ảnh mới ngay lập tức
    await fetchUserData();
    // Modal sẽ tự đóng bên trong nó, hoặc bạn có thể set false ở đây nếu muốn chắc chắn
    // setShowProfile(false);
  };

  return (
    <>
      {/* 4. Truyền prop onSuccess vào Modal */}
      <ModalUpdateProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        userInfo={userInfo}
        onSuccess={handleUpdateSuccess} // <--- QUAN TRỌNG: Để reload dữ liệu
      />

      <div className="ad-layout-topbar h-100 d-flex align-items-center justify-content-between">
        {renderLable()}

        <div className="icons">
          {/* Nếu muốn hiện Avatar thay vì icon user thì dùng đoạn code dưới */}
          {/* {userInfo?.avatar ? (
            <img 
              src={userInfo.avatar?.url || userInfo.avatar} 
              style={{width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover'}} 
              onClick={handleOpenProfile}
            />
          ) : (
             <i className="pi pi-user" ... ></i>
          )} 
          */}

          <i
            className="pi pi-user"
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            onClick={handleOpenProfile}
            title="Cập nhật thông tin cá nhân"
          ></i>
        </div>
      </div>
    </>
  );
}
