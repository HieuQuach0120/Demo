import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { updateUserProfile, uploadUserAvatar } from "../../service/UserService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userInfo: any;
  onSuccess: () => void;
}
const API_BASE_URL = "https://nonseasonable-inversive-jefferson.ngrok-free.dev";
// 2. Thêm onSuccess vào danh sách nhận props
const ModalUpdateProfile: React.FC<Props> = ({
  isOpen,
  onClose,
  userInfo,
  onSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const defaultValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (isOpen && userInfo) {
      reset({
        fullName: userInfo.fullName || userInfo.name || "",
        email: userInfo.email || "",
        phoneNumber: userInfo.phoneNumber || "",
      });
      // Logic này đã tốt
      const avatarUrl = userInfo.avatarUrl || userInfo.avatar || "";
      console.log("userInfo", userInfo);

      setAvatarPreview(avatarUrl);
    }
  }, [isOpen, userInfo, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) return;

    try {
      const res = await uploadUserAvatar(file);
      if (res) {
        setAvatarPreview(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: any) => {
    const res = await updateUserProfile({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber.trim(),
    });

    if (res) {
      onSuccess(); // <--- 3. GỌI HÀM NÀY ĐỂ HEADER RELOAD DATA
      onClose();
    }
  };

  return (
    <Dialog
      header="Cập nhật thông tin cá nhân"
      visible={isOpen}
      style={{ width: "600px" }}
      onHide={onClose}
      draggable={false}
    >
      <div className="text-center mb-4">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#f8f9fa",
            borderRadius: "50%",
            margin: "0 auto",
            position: "relative",
            border: "1px solid #dee2e6",
          }}
        >
          {avatarPreview ? (
            <img
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <i
              className="pi pi-user"
              style={{
                fontSize: "50px",
                color: "#6c757d",
                lineHeight: "100px",
              }}
            ></i>
          )}

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#212529",
              color: "#fff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <i className="pi pi-camera" style={{ fontSize: "14px" }}></i>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100">
          <div className="row">
            <div className="col-12 mb-3">
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Họ tên là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <InputTextCustom
                      {...field}
                      label="Họ và tên"
                      required={true}
                      isValidate={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <ErrorMessageCustom error={errors.fullName} />
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-12 mb-3">
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "SĐT bắt buộc" }}
                render={({ field }) => (
                  <InputTextCustom
                    {...field}
                    label="Số điện thoại"
                    required={true}
                  />
                )}
              />
            </div>
            <div className="col-12 mb-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputTextCustom {...field} label="Email" disabled={true} />
                )}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-end gap-2">
              <Button
                label="Hủy"
                className="p-button-text p-button-secondary"
                onClick={onClose}
                type="button"
              />
              <Button
                label="Cập nhật thông tin"
                className="p-button-dark"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalUpdateProfile;
