import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";

export default function HeaderComponent() {
  const allItems = [
    { label: "Member Management", url: "/member" },
    { label: "Event Management", url: "/event" },
    { label: "Event Register", url: "/event/register-search" },
    { label: "Configuration Management", url: "/configuration" },
  ];
  const home = { icon: "pi pi-home", url: "/event" };

  const location = useLocation();
  //   const [items, setItems] = useState<any[]>([]);
  //   useEffect(() => {
  //     let _items: any[] = [];
  //     _items = allItems.filter((item) => location.pathname.includes(item.url));
  //     setItems(_items);
  //   }, [location]);

  const renderLable = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return <h2>Tổng quan</h2>;
      case "/detail":
        return <h2>Chi tiết</h2>;
      default:
        return <></>;
    }
  };
  return (
    <div className="ad-layout-topbar h-100 d-flex align-items-center justify-content-between">
      {/* <>
        {items && items.length > 0 && <BreadCrumb model={items} home={home} />}
      </> */}
      {renderLable()}
      <div className="icons">
        {/* <i className="pi pi-language"></i> */}
        <i className="pi pi-user"></i>
      </div>
    </div>
  );
}
