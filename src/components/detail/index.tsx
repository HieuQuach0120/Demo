import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import InputNumberCustom from "../common/InputNumberCustom";
import CalendarCustom from "../common/CalendarCustom";
import InputTextareaCustom from "../common/InputTextareaCustom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const DetailComponent: React.FC<{}> = ({}) => {
  const [data, setData] = useState<any>([]);
  let defaultValues = {
    name: "",
    value: "",
    dateFrom: null,
    dateTo: null,
    description: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    console.log("data", data);
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
            <div className="col-6">
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <>
                    <InputNumberCustom
                      label="Số tiền"
                      required={false}
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["value"] ? true : false}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Controller
                name="dateFrom"
                control={control}
                render={({ field }) => (
                  <>
                    <CalendarCustom
                      label="Từ ngày"
                      required={false}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["dateFrom"] ? true : false}
                    />
                    <div>{errors["dateFrom"] ? true : false}</div>
                    {errors["dateFrom"] && (
                      <ErrorMessageCustom error={errors["dateFrom"]} />
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-6">
              <Controller
                name="dateTo"
                control={control}
                render={({ field }) => (
                  <>
                    <CalendarCustom
                      id="dateTo"
                      label="Đến ngày"
                      maxDate={new Date()}
                      value={field.value}
                      placeholder="dd-MM-yyyy"
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["dateTo"] ? true : false}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <InputTextareaCustom
                      label="Mô tả"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["description"] ? true : false}
                      rows={2}
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
          <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
            <Column field="code" header="#"></Column>
            <Column field="name" header="Tên"></Column>
            <Column field="value" header="Số tiền"></Column>
            <Column field="date" header="Ngày"></Column>
            <Column field="description" header="Mô tả"></Column>
          </DataTable>
          <div className="w-100 d-flex justify-content-end">
            {/* <div className="card"> */}
            <Paginator first={1} rows={10} totalRecords={120} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailComponent;
