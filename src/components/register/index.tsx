import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import PasswordCustom from "../common/PasswordCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import api from "../../service"; // import axios instance đã cấu hình sẵn
import "./register.css";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.current?.show({
        severity: "warn",
        summary: "Lỗi",
        detail: "Mật khẩu xác nhận không khớp",
        life: 3000,
      });
      return;
    }

    setLoading(true); // ✅ Di chuyển vào đây

    try {
      const res = await api.post("/authen/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res && (res.status === 200 || res.status === 201)) {
        toast.current?.show({
          severity: "success",
          summary: "Thành công",
          detail: "Đăng ký thành công!",
          life: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Thất bại",
          detail: res?.data?.message || "Đăng ký không thành công!",
          life: 3000,
        });
      }
    } catch (err: any) {
      console.error("Error in register:", err);
      toast.current?.show({
        severity: "error",
        summary: "Thất bại",
        detail:
          err?.response?.data?.message ||
          "Có lỗi xảy ra khi kết nối đến server.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toast} />
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Đăng ký</h2>

          <div className="row">
            {/* Họ tên */}
            <div className="col-12 mb-3">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Họ tên là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <InputTextCustom
                      label="Họ tên"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.name}
                    />
                    {errors.name && (
                      <ErrorMessageCustom error={errors.name} />
                    )}
                  </>
                )}
              />
            </div>

            {/* Email */}
            <div className="col-12 mb-3">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputTextCustom
                      label="Email"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.email}
                    />
                    {errors.email && (
                      <ErrorMessageCustom error={errors.email} />
                    )}
                  </>
                )}
              />
            </div>

            {/* Mật khẩu */}
            <div className="col-12 mb-3">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu tối thiểu 6 ký tự",
                  },
                }}
                render={({ field }) => (
                  <>
                    <PasswordCustom
                      label="Mật khẩu"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.password}
                    />
                    {errors.password && (
                      <ErrorMessageCustom error={errors.password} />
                    )}
                  </>
                )}
              />
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="col-12 mb-3">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (value) =>
                    value === password || "Mật khẩu không khớp",
                }}
                render={({ field }) => (
                  <>
                    <PasswordCustom
                      label="Xác nhận mật khẩu"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      isValidate={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessageCustom
                        error={errors.confirmPassword}
                      />
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* Nút submit */}
          <div className="row">
            <div className="col-12 mt-3 d-flex justify-content-center">
              <Button
                type="submit"
                className="w-100"
                label={loading ? "Đang xử lý..." : "Đăng ký"}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
