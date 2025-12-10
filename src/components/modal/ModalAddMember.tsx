import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import InputTextareaCustom from "../common/InputTextareaCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { createMember } from "../../service/MemberService";
import { toast } from "react-toastify";

interface DataProps {
  isOpen: boolean;
  onClose: () => void;
  onGetList: () => void;
}

const defaultValues = {
  name: "",
  description: "",
};

const ModalAddMember: React.FC<DataProps> = ({
  isOpen,
  onClose,
  onGetList,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  // Reset form về rỗng mỗi khi mở Modal
  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      name: data.name ? data.name.trim() : "",
      description: data.description ? data.description.trim() : "",
    };

    if (payload.name) {
      try {
        const res = await createMember(payload);
        if (res) {
          onGetList();
          onClose();
        }
      } catch (error) {
        return;
      }
    }
  };

  return (
    <Dialog
      header="Thêm thành viên"
      visible={isOpen}
      style={{ width: "500px" }}
      onHide={() => {
        if (!isOpen) return;
        onClose();
      }}
      className="modal-member"
      appendTo={document.body}
      baseZIndex={9999}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100">
          <div className="row">
            {/* Tên thành viên */}
            <div className="col-12 mb-3">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Vui lòng nhập tên",
                  maxLength: {
                    value: 255,
                    message: "Tên không được quá 255 ký tự",
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
                      isValidate={!!errors["name"]}
                    />
                    {errors["name"] && (
                      <ErrorMessageCustom error={errors["name"]} />
                    )}
                  </>
                )}
              />
            </div>

            {/* Mô tả / Ghi chú */}
            <div className="col-12">
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 255,
                    message: "Mô tả không được quá 255 ký tự",
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
                      isValidate={!!errors["description"]}
                      rows={3}
                    />
                    {errors["description"] && (
                      <ErrorMessageCustom error={errors["description"]} />
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="row">
            <div className="col-12 mt-4 d-flex justify-content-end gap-2">
              <Button
                type="button"
                label="Đóng"
                icon="pi pi-times"
                onClick={onClose}
                className="p-button-text"
              />
              <Button type="submit" label="Lưu" icon="pi pi-check" />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalAddMember;
