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

  // --- EFFECTS ---
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

  // --- HANDLERS ---
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-100 p-2">
      {/* --- KHUNG TÌM KIẾM --- */}
      <div className="row mb-3">
        <div className="col-12 col-md-4 mb-2">
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

        <div className="col-12 col-md-4 mb-2">
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

        <div className="col-12 col-md-4 mt-md-4 mb-2 d-flex align-items-center">
          <Button
            type="submit"
            className="btn-login"
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

      <hr />

      {/* --- BẢNG DỮ LIỆU --- */}
      <div className="row">
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
            className="justify-content-end"
          />
        </div>
      </div>
      {/* --- 5. MODAL HIỂN THỊ PDF --- */}
      <Dialog
        header="Tài liệu hướng dẫn "
        visible={showDocument}
        style={{ width: "80vw", maxWidth: "1000px" }}
        maximizable
        onHide={() => setShowDocument(false)}
      >
        <PdfViewer fileUrl="/Mẫu đề cương.pdf" />
      </Dialog>
    </form>
  );
};

export default AdminComponent;
