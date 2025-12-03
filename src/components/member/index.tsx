import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useSelector } from "react-redux";
// import { AppDispatch, useAppDispatch } from '';
import { baseFoldersById } from "../../app/member/member.action";
import { AppDispatch, useAppDispatch } from "../../app/store";
import ModalAddMember from "../modal/ModalAddMember";

const MemberComponent: React.FC<{}> = ({}) => {
  const [data, setData] = useState<any>([]);
  const [dataSearch, setDataSearch] = useState<any>({
    name: "",
    offset: 0,
    limit: 10,
  });
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);
  //redux
  const dispatch: AppDispatch = useAppDispatch();
  const { listMember, loadingMember } = useSelector(
    (state: any) => state.member
  );

  useEffect(() => {
    console.log("members", listMember);
    onGetListMember();
  }, []);

  useEffect(() => {
    console.log("listMember", listMember);
  }, [listMember]);

  let defaultValues = {
    name: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    console.log("data", data);
  };

  const onGetListMember = () => {
    dispatch(baseFoldersById(dataSearch));
  };

  const handlePageChange = (event: any) => {
    const newDataSearch = { ...dataSearch, offset: event.first };
    dispatch(baseFoldersById(newDataSearch));
    setDataSearch({ ...dataSearch, offset: event.first });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-100 h-100">
        <div className="w-100 h-25">
          <div className="row">
            <div className="col-6">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <InputTextCustom
                      label="Tên"
                      required={false}
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["name"] ? true : false}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12 mt-4 d-flex justify-content-center">
              <Button type="submit" className="btn-login" label="Tìm kiếm" />
            </div>
          </div>
        </div>
        <div className="w-100 h-75">
          <div className="w-100 d-flex justify-content-end mt-2 mb-2">
            <Button type="submit" onClick={() => setOpenModalAddMember(true)}>
              Thêm thành viên
            </Button>
          </div>
          <DataTable
            value={listMember?.members || []}
            tableStyle={{ minWidth: "50rem" }}
            loading={loadingMember} // Thêm loading indicator có sẵn của PrimeReact
            emptyMessage="Không có dữ liệu"
          >
            <Column
              header="#"
              body={(rowData, { rowIndex }) => dataSearch.offset + rowIndex + 1}
            />
            <Column field="name" header="Tên"></Column>
            <Column field="description" header="Mô tả"></Column>
          </DataTable>
          <div className="w-100 d-flex justify-content-end">
            {/* <div className="card"> */}
            <Paginator
              first={dataSearch.offset}
              rows={dataSearch.limit}
              totalRecords={listMember?.total || null}
              onPageChange={handlePageChange}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
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
