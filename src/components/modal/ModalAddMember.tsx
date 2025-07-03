import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import InputTextareaCustom from "../common/InputTextareaCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { createMember, updateMember } from "../../service/MemberService";

interface MemberData {
  id?: number;
  name: string;
  description?: string;
}

interface DataProps {
  isOpen: boolean;
  onClose: () => void;
  onGetList: () => void;
  mode: "add" | "update";
  member?: MemberData | null;
}

const ModalAddMember: React.FC<DataProps> = ({
  isOpen,
  onClose,
  onGetList,
  mode,
  member,
}) => {
  let defaultValues = {
    name: "", 
    description: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({defaultValues});
  useEffect(() => {
    if (mode === "update" && member) {
      reset({
        name: member.name || "",
        description: member.description || "",
      });
    } else {
      reset({ name: "", description: "" });
    }
  }, [member, isOpen, mode, reset]);

  const onSubmit = async (data: any) => {
    if (!data.name.trim()) return;

    try {
      if (mode === "add") {
        await createMember(data);
      } else if (mode === "update" && member?.id) {
        await updateMember(member.id, data);
      }
      onGetList();
      onClose();
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  return (
    <Dialog
      header={mode === "add" ? "Thêm thành viên" : "Cập nhật thành viên"}
      visible={isOpen}
      style={{ width: "50vw" }}
      onHide={onClose}
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
                      required
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.name}
                    />
                    {errors.name && <ErrorMessageCustom error={errors.name} />}
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
                      maxLength={255}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.description}
                    />
                    {errors.description && (
                      <ErrorMessageCustom error={errors.description} />
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
                onClick={onClose}
                className="p-button-text"
              />
              <Button type="submit" label={mode === "add" ? "Lưu" : "Cập nhật"} />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalAddMember;
