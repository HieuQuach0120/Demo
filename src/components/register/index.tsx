import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import PasswordCustom from "../common/PasswordCustom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../service/AuthService"; // Đảm bảo bạn đã thêm hàm register vào AuthService như bước trước

const Register = () => {
  const navigate = useNavigate();

  // Giá trị mặc định cho form đăng ký
  let defaultValues = {
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    passWord: "",
    confirmPassword: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch, // Dùng để theo dõi mật khẩu nhập vào để so sánh
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    // Gọi API đăng ký (đã mock hoặc thật)
    const res = await register({
      userName: data.userName.trim(),
      passWord: data.passWord,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });

    if (res) {
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } else {
      toast.error("Đăng ký thất bại.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-container bg-white">
        {/* Giữ nguyên background giống trang Login */}
        <div className="bg-login slide-in-left d-none d-xl-block"></div>

        <div className="login-content position-relative d-flex flex-column align-items-center justify-content-center">
          <div className="login-logo scale-in-center position-absolute top-0 w-100 mt-4 mt-xxl-5"></div>
          <div className="login-head">Register</div>

          <div className="login-form" style={{ width: "100%" }}>
            <div className="row">
              {/* Username */}
              <div className="col-12 mb-2">
                <Controller
                  name="userName"
                  control={control}
                  rules={{
                    required: "Username is required",
                    maxLength: { value: 255, message: "Max length 255" },
                  }}
                  render={({ field }) => (
                    <>
                      <InputTextCustom
                        label="Username"
                        required={true}
                        maxLength={255}
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        isValidate={errors["userName"] ? true : false}
                      />
                      {errors["userName"] && (
                        <ErrorMessageCustom error={errors["userName"]} />
                      )}
                    </>
                  )}
                />
              </div>

              {/* Full Name */}
              <div className="col-12 mb-2">
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <>
                      <InputTextCustom
                        label="Full Name"
                        required={true}
                        maxLength={255}
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        isValidate={errors["fullName"] ? true : false}
                      />
                      {errors["fullName"] && (
                        <ErrorMessageCustom error={errors["fullName"]} />
                      )}
                    </>
                  )}
                />
              </div>

              {/* Email */}
              <div className="col-12 mb-2">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputTextCustom
                        label="Email"
                        required={true}
                        maxLength={255}
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        isValidate={errors["email"] ? true : false}
                      />
                      {errors["email"] && (
                        <ErrorMessageCustom error={errors["email"]} />
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col-12 mb-2">
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: "Invalid phone number format",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputTextCustom
                        label="Phone Number"
                        required={true}
                        maxLength={10}
                        value={field.value}
                        onChange={(e: any) => {
                          const val = e.target.value;
                          if (!val || /^\d+$/.test(val)) {
                            field.onChange(val);
                          }
                        }}
                        isValidate={errors["phoneNumber"] ? true : false}
                      />
                      {errors["phoneNumber"] && (
                        <ErrorMessageCustom error={errors["phoneNumber"]} />
                      )}
                    </>
                  )}
                />
              </div>
              {/* Password */}
              {/* Password */}
              <div className="col-12 mb-2">
                <Controller
                  name="passWord"
                  control={control}
                  rules={{
                    required: "Password is required",

                    pattern: {
                      value: /^[A-Z]/,
                      message: "Password must start with an uppercase letter",
                    },

                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <PasswordCustom
                        required={true}
                        maxLength={255}
                        label="Password"
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        isValidate={errors["passWord"] ? true : false}
                      />
                      {errors["passWord"] && (
                        <ErrorMessageCustom error={errors["passWord"]} />
                      )}
                    </>
                  )}
                />
              </div>

              {/* Confirm Password */}
              <div className="col-12 mb-2">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (val: string) => {
                      if (watch("passWord") !== val) {
                        return "Your passwords do NOT match";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <PasswordCustom
                        required={true}
                        maxLength={255}
                        label="Confirm Password"
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        isValidate={errors["confirmPassword"] ? true : false}
                      />
                      {errors["confirmPassword"] && (
                        <ErrorMessageCustom error={errors["confirmPassword"]} />
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12 mt-4 d-flex justify-content-center flex-column align-items-center">
                <Button
                  type="submit"
                  className="w-25 btn-login mb-3"
                  label="Register"
                />

                {/* Nút quay lại Login */}
                <span
                  style={{
                    cursor: "pointer",
                    color: "#6366f1",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
