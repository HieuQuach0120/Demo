import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import InputTextareaCustom from "../common/InputTextareaCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { updateMember } from "../../service/MemberService";

interface ModalUpdateMemberProps {
  isOpen: boolean;
  onClose: () => void;
  onGetList: () => void;
  member: {
    id: number;
    name: string;
    description?: string;
  } | null;
}

const ModalUpdateMember: React.FC<ModalUpdateMemberProps> = ({
  isOpen,
  onClose,
  onGetList,
  member,
}) => {
  // Initialize default values from member prop
  const defaultValues = {
    name: member?.name || "",
    description: member?.description || "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  // Reset form when member changes or modal opens
  useEffect(() => {
    reset(defaultValues);
  }, [member, isOpen]);

  const onSubmit = async (data: any) => {
    if (member && data.name.trim() !== "") {
      try {
        await updateMember(member.id, data);
        onGetList();
        onClose();
      } catch (error) {
        console.error("Error updating member:", error);
      }
    }
  };

  return (
    <Dialog
      header="Cập nhật thành viên"
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
                  maxLength: { value: 255, message: "Maxlength 255" },
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
                rules={{ maxLength: { value: 255, message: "Maxlength 255" } }}
                render={({ field }) => (
                  <>
                    <InputTextareaCustom
                      label="Ghi chú"
                      required={false}
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
              <Button type="submit" label="Cập nhật" />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalUpdateMember;
