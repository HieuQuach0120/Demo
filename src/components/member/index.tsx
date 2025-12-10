import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useSelector } from "react-redux";

import { baseFoldersById } from "../../app/member/member.action";
import { AppDispatch, useAppDispatch } from "../../app/store";
import ModalAddMember from "../modal/ModalAddMember";
import { deleteMember, getDetailMember } from "../../service/MemberService";
import { toast } from "react-toastify";

const MemberComponent: React.FC<{}> = ({}) => {
  const [dataSearch, setDataSearch] = useState<any>({
    name: "",
    offset: 0,
    limit: 10,
  });
  const [searchedMember, setSearchedMember] = useState<any>(null);
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);

  const dispatch: AppDispatch = useAppDispatch();
  const { listMember, loadingMember } = useSelector(
    (state: any) => state.member
  );

  useEffect(() => {
    onGetListMember();
  }, []);

  let defaultValues = {
    id: "",
    name: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    if (data.id && data.id.trim() !== "") {
      const result = await getDetailMember(data.id);
      if (result) {
        // Kiểm tra logic tên trùng khớp
        if (data.name && data.name.trim() !== "") {
          const resultName = result.name ? result.name.toLowerCase() : "";
          const inputName = data.name.trim().toLowerCase();
          if (!resultName.includes(inputName)) {
            setSearchedMember(null);
            return;
          }
        }
        setSearchedMember(result);
      } else {
        setSearchedMember(null);
      }
    } else {
      setSearchedMember(null);
      const newSearch = { ...dataSearch, name: data.name, offset: 0 };
      setDataSearch(newSearch);
      dispatch(baseFoldersById(newSearch));
    }
  };

  const onGetListMember = () => {
    setSearchedMember(null);
    dispatch(baseFoldersById(dataSearch));
  };

  const handlePageChange = (event: any) => {
    if (searchedMember) return;
    const newDataSearch = { ...dataSearch, offset: event.first };
    dispatch(baseFoldersById(newDataSearch));
    setDataSearch({ ...dataSearch, offset: event.first });
  };

  // Hàm thực hiện xóa (được gọi khi người dùng bấm "Có")
  const acceptDelete = async (id: any) => {
    const res = await deleteMember(id);
    if (res) {
      // Logic làm mới danh sách
      if (searchedMember) {
        setSearchedMember(null);
        onGetListMember();
      } else {
        onGetListMember();
      }
    }
  };

  // Hàm kích hoạt Popup
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: any
  ) => {
    confirmPopup({
      target: event.currentTarget, // Quan trọng: chỉ định popup hiện ở ngay nút bấm này
      message: "Bạn có chắc chắn muốn xóa thành viên này?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Có",
      rejectLabel: "Không",
      acceptClassName: "p-button-danger", // Nút đồng ý màu đỏ
      accept: () => acceptDelete(id), // Gọi hàm xóa nếu chọn "Có"
    });
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          type="button"
          icon="pi pi-trash"
          label="Xóa"
          className="p-button-danger p-button-sm"
          style={{ padding: "0.5rem 1rem" }}
          // QUAN TRỌNG: Truyền (e) vào hàm handleDelete
          onClick={(e) => handleDelete(e, rowData.id || rowData._id)}
        />
      </div>
    );
  };

  const tableData = searchedMember
    ? [searchedMember]
    : listMember?.members || [];
  const totalRecords = searchedMember ? 1 : listMember?.total || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-100 p-2">
      {/* TÌM KIẾM */}
      <div className="row mb-3">
        <div className="col-12 col-md-4 mb-2">
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <InputTextCustom
                label="ID Member"
                required={false}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className="col-12 col-md-4 mb-2">
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
                isValidate={errors["name"] ? true : false}
              />
            )}
          />
        </div>

        <div className="col-12 col-md-4 mt-md-4 mb-2 d-flex align-items-center">
          <Button type="submit" className="btn-login" label="Tìm kiếm" />
        </div>
      </div>

      <hr />

      {/* BẢNG DỮ LIỆU */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-end mb-3">
            <Button type="button" onClick={() => setOpenModalAddMember(true)}>
              Thêm thành viên
            </Button>
          </div>

          <DataTable
            value={tableData}
            tableStyle={{ minWidth: "50rem" }}
            loading={loadingMember}
            emptyMessage="Không có dữ liệu"
            showGridlines // Thêm kẻ bảng cho đẹp giống Excel
            stripedRows // Thêm màu xen kẽ các dòng
          >
            <Column field="id" header="ID" style={{ width: "80px" }}></Column>
            <Column field="name" header="Tên" style={{ width: "20%" }}></Column>
            <Column field="description" header="Mô tả"></Column>

            <Column
              header="Hành động"
              body={actionBodyTemplate}
              style={{ width: "120px", textAlign: "center" }}
            />
          </DataTable>

          {!searchedMember && (
            <Paginator
              first={dataSearch.offset}
              rows={dataSearch.limit}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              className="justify-content-end" // Căn phải phân trang
            />
          )}
        </div>
      </div>
      <ConfirmPopup appendTo={document.body} />
      {openModalAddMember && (
        <ModalAddMember
          isOpen={openModalAddMember}
          onClose={() => setOpenModalAddMember(false)}
          onGetList={onGetListMember}
        />
      )}
    </form>
  );
};

export default MemberComponent;
