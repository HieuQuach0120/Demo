import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useSelector } from "react-redux";
import { AppDispatch, useAppDispatch } from "../../app/store";
import { baseFoldersById } from "../../app/member/member.action";
import { deleteMemberById } from "../../service/MemberService";
import ModalAddMember from "../modal/ModalAddMember";

interface DataSearch {
  name: string;
  offset: number;
  limit: number;
}

const MemberComponent: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { listMember, loadingMember } = useSelector((state: any) => state.member);

  // states for pagination & search
  const [dataSearch, setDataSearch] = useState<DataSearch>({ name: "", offset: 0, limit: 10 });

  // control modals
  const [openModalAddMember, setOpenModalAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // React Hook Form for search
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    dispatch(baseFoldersById(dataSearch));
  };

  const onSearch = (formData: any) => {
    const updated = { ...dataSearch, name: formData.name, offset: 0 };
    setDataSearch(updated);
    dispatch(baseFoldersById(updated));
  };

  const handlePageChange = (event: any) => {
    const updated = { ...dataSearch, offset: event.first };
    setDataSearch(updated);
    dispatch(baseFoldersById(updated));
  };

  const handleAdd = () => {
    setOpenModalAddMember(true);
  };

  // hàm update và mở Modal update
  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setOpenModalAddMember(true);
  };

  // hàm Delete
  const handleDelete = async (id: number) => {
  if (!window.confirm("Bạn có chắc muốn xóa?")) return;
  
  const result = await deleteMemberById(id);
  if (result) {
    // thành công thì load lại list
    fetchList();
  }
};

  return (
    <>
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="row mb-3">
          <div className="col-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputTextCustom
                  label="Tên"
                  required={false}
                  maxLength={255}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  isValidate={false}
                />
              )}
            />
          </div>
          <div className="col-6 d-flex align-items-end">
            <Button type="submit" label="Tìm kiếm" />
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-end mb-2">
        <Button label="Thêm thành viên" onClick={handleAdd} />
      </div>

      <DataTable value={listMember.members} loading={loadingMember} tableStyle={{ minWidth: "50rem" }}>
        <Column header="#" body={(rowData, { rowIndex }) => dataSearch.offset + rowIndex + 1} />
        <Column field="name" header="Tên" />
        <Column field="description" header="Mô tả" />
        <Column
          header="Hành động"
          body={(rowData) => (
            <>
              <Button
                label="Sửa"
                className="p-button-sm p-button-text"
                onClick={() => handleEdit(rowData)}
              />
              <Button
                label="Xóa"
                className="p-button-sm p-button-danger p-button-text"
                onClick={() => handleDelete(rowData.id)}
              />
            </>
          )}
        />
      </DataTable>

      <div className="d-flex justify-content-end mt-2">
        <Paginator
          first={dataSearch.offset}
          rows={dataSearch.limit}
          totalRecords={listMember?.total}
          onPageChange={handlePageChange}
        />
      </div>

      <ModalAddMember
      isOpen={openModalAddMember}
      onClose={() => {
        setOpenModalAddMember(false);
        setSelectedMember(null);
      }}
      onGetList={fetchList}
      mode={selectedMember ? "update" : "add"}
      member={selectedMember}
    />
    </>
  );
};

export default MemberComponent;
