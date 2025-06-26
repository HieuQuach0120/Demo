import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import InputTextareaCustom from "../common/InputTextareaCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { createMember } from "../../service/MemberService";

interface DataProps {
  isOpen: boolean;
  onClose: () => void;
  onGetList: () => void;
}
const ModalAddMember: React.FC<DataProps> = ({
  isOpen,
  onClose,
  onGetList,
}) => {
  let defaultValues = {
    name: "",
    description: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    if (data.name && data.name !== "") {
      try {
        await createMember(data);
        onGetList();
        onClose();
      } catch {
        return;
      }
    }
  };

  return (
    <Dialog
      header="Thêm thành viên"
      visible={isOpen}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!isOpen) return;
        onClose();
      }}
      //   footer={footerContent}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100 h-25">
          <div className="row">
            <div className="col-6">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Vui lòng nhập tên",
                  maxLength: {
                    value: 255,
                    message: "Maxlength 255",
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputTextCustom
                      label="Tên"
                      required={true}
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["name"] ? true : false}
                    />
                    <div>{errors["name"] ? true : false}</div>
                    {errors["name"] && (
                      <ErrorMessageCustom error={errors["name"]} />
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-6">
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 255,
                    message: "Maxlength 255",
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputTextareaCustom
                      label="Ghi chú"
                      required={false}
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={errors["description"] ? true : false}
                    />
                    <div>{errors["description"] ? true : false}</div>
                    {errors["description"] && (
                      <ErrorMessageCustom error={errors["description"]} />
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4 d-flex justify-content-end">
              <Button
                label="Đóng"
                icon="pi pi-times"
                onClick={() => onClose()}
                className="p-button-text"
              />
              <Button type="submit" label="Lưu" />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
export default ModalAddMember;
