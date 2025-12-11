import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";

import InputTextCustom from "../common/InputTextCustom";
import { getListAdmin } from "../../service/AdminService";
import PdfViewer from "../common/PdfViewer";
import "./AdminComponent.scss";

const AdminComponent: React.FC = () => {
  const [listData, setListData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  const [dataSearch, setDataSearch] = useState<any>({
    userName: "",
    email: "",
    offset: 0,
    limit: 10,
  });

  const defaultValues = {
    userName: "",
    email: "",
  };

  const { control, handleSubmit } = useForm({ defaultValues });

  useEffect(() => {
    fetchData();
  }, [dataSearch]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getListAdmin(dataSearch);

    if (res) {
      if (Array.isArray(res)) {
        setListData(res);
        setTotalRecords(res.length);
      } else if (res.content && Array.isArray(res.content)) {
        setListData(res.content);
        setTotalRecords(res.totalElements || 0);
      } else if (res.data && Array.isArray(res.data)) {
        setListData(res.data);
        setTotalRecords(res.total || 0);
      } else {
        setListData([]);
        setTotalRecords(0);
      }
    } else {
      setListData([]);
      setTotalRecords(0);
    }
    setLoading(false);
  };

  const onSubmit = (data: any) => {
    setDataSearch({
      ...dataSearch,
      userName: data.userName?.trim(),
      email: data.email?.trim(),
      offset: 0,
    });
  };

  const handlePageChange = (event: any) => {
    setDataSearch({
      ...dataSearch,
      offset: event.first,
      limit: event.rows,
    });
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        {/* --- KHUNG TÌM KIẾM  --- */}
        <div className="search-section row">
          <div className="col-12 col-md-4 field-group">
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <InputTextCustom
                  {...field}
                  label="Tên tài khoản"
                  placeholder="Nhập tên..."
                  required={false}
                />
              )}
            />
          </div>

          <div className="col-12 col-md-4 field-group">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputTextCustom
                  {...field}
                  label="Email"
                  placeholder="Nhập email..."
                  required={false}
                />
              )}
            />
          </div>

          {/* Khu vực nút bấm  */}
          <div className="col-12 col-md-4 action-buttons">
            <Button
              type="submit"
              className="btn-search"
              label="Tìm kiếm"
              icon="pi pi-search"
              loading={loading}
            />
            <Button
              type="button"
              className="p-button-outlined p-button-secondary"
              label="Hướng dẫn"
              icon="pi pi-file-pdf"
              onClick={() => setShowDocument(true)}
            />
          </div>
        </div>

        {/* --- BẢNG DỮ LIỆU  --- */}
        <div className="table-section row">
          <div className="col-12">
            <DataTable
              value={Array.isArray(listData) ? listData : []}
              tableStyle={{ minWidth: "50rem" }}
              loading={loading}
              emptyMessage="Không tìm thấy quản trị viên nào."
              showGridlines
              stripedRows
              scrollable
              scrollHeight="400px"
            >
              <Column field="id" header="ID" style={{ width: "80px" }} />
              <Column
                field="username"
                header="Username"
                sortable
                style={{ minWidth: "150px" }}
              />
              <Column
                field="email"
                header="Email"
                style={{ minWidth: "250px" }}
              />
              <Column
                field="phoneNumber"
                header="Số điện thoại"
                style={{ width: "150px" }}
              />
            </DataTable>

            <Paginator
              first={dataSearch.offset}
              rows={dataSearch.limit}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              className="justify-content-end border-top-0"
            />
          </div>
        </div>

        {/* --- MODAL HIỂN THỊ PDF --- */}
        <Dialog
          header="Tài liệu hướng dẫn"
          visible={showDocument}
          style={{ width: "80vw", maxWidth: "1000px" }}
          maximizable
          onHide={() => setShowDocument(false)}
        >
          <PdfViewer />
        </Dialog>
      </form>
    </div>
  );
};

export default AdminComponent;
