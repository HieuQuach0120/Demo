import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import PasswordCustom from "../common/PasswordCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { changePassword } from "../../service/AuthService";

const ChangePassword = () => {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
  } = useForm({ defaultValues });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: any) => {
    // Gọi API
    const res = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });

    if (res.success) {
      reset();
    } else {
      const backendErrorMessage = res.message;

      setError("oldPassword", {
        type: "manual",
        message: backendErrorMessage,
      });
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Đổi mật khẩu</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-12">
            <Controller
              name="oldPassword"
              control={control}
              rules={{ required: "Vui lòng nhập mật khẩu cũ" }}
              render={({ field }) => (
                <>
                  <PasswordCustom
                    {...field}
                    label="Mật khẩu hiện tại"
                    required={true}
                    isValidate={!!errors.oldPassword}
                  />
                  {/* ErrorMessageCustom sẽ hiển thị đúng câu text mà API trả về */}
                  {errors.oldPassword && (
                    <ErrorMessageCustom error={errors.oldPassword} />
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "Vui lòng nhập mật khẩu mới",
                minLength: { value: 6, message: "Mật khẩu phải từ 6 ký tự" },
                pattern: {
                  value: /^[A-Z]/,
                  message: "Ký tự đầu tiên phải viết hoa",
                },
                validate: (val) => {
                  if (watch("oldPassword") === val)
                    return "Mật khẩu mới không được trùng mật khẩu cũ";
                  return true;
                },
              }}
              render={({ field }) => (
                <>
                  <PasswordCustom
                    {...field}
                    label="Mật khẩu mới"
                    required
                    isValidate={!!errors.newPassword}
                  />
                  {errors.newPassword && (
                    <ErrorMessageCustom error={errors.newPassword} />
                  )}
                </>
              )}
            />
          </div>
          <div className="col-12 col-md-6">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Vui lòng xác nhận mật khẩu mới",
                validate: (val) =>
                  val === newPassword || "Mật khẩu xác nhận không khớp",
              }}
              render={({ field }) => (
                <>
                  <PasswordCustom
                    {...field}
                    label="Nhập lại mật khẩu mới"
                    required
                    isValidate={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <ErrorMessageCustom error={errors.confirmPassword} />
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-2 d-flex justify-content-center">
            <Button
              label="Lưu thay đổi"
              icon="pi pi-check"
              type="submit"
              className="btn-login"
              style={{ minWidth: "150px" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
