import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import PasswordCustom from "../common/PasswordCustom";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../service/AuthService";
import jwt from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  let defaultValues = {
    userName: "",
    passWord: "",
    memorize: false,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    console.log("data", data);
    data.userName = data.userName.trim();
    if (data) {
      navigate("/");
    }
    const token = await login(data);
    if (token) {
      const payload: any = jwt(token || "");
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-container bg-white">
        <div className="bg-login slide-in-left d-none d-xl-block"></div>
        <div className="login-content position-relative d-flex flex-column align-items-center justify-content-center">
          <div className="login-logo scale-in-center position-absolute top-0 w-100 mt-4 mt-xxl-5"></div>
          <div className="login-head">Login</div>
          <div className="login-form">
            <div className="row">
              <div className="col-12 mb-2">
                <Controller
                  name="userName"
                  control={control}
                  rules={{
                    required: "Username is require",
                    maxLength: {
                      value: 255,
                      message: "Maxlength 255",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputTextCustom
                        label="Username"
                        required={true}
                        maxLength={255}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        isValidate={errors["userName"] ? true : false}
                      />
                      <div>{errors["userName"] ? true : false}</div>
                      {errors["userName"] && (
                        <ErrorMessageCustom error={errors["userName"]} />
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col-12 mb-2">
                <Controller
                  name="passWord"
                  control={control}
                  rules={{
                    required: "Password is require",
                    maxLength: {
                      value: 255,
                      message: "Maxlength 255",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <PasswordCustom
                        required={true}
                        maxLength={255}
                        label="Password"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        isValidate={errors["passWord"] ? true : false}
                      />
                      {errors["passWord"] && (
                        <ErrorMessageCustom error={errors["passWord"]} />
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-4 d-flex justify-content-center">
                <Button
                  type="submit"
                  className="w-25 btn-login"
                  label="Login"
                />
              </div>
              <div>
                <Link to="/forgot" className="mt-3 text-decoration-none text-primary"
                style={{ fontSize: "14px", 
                         textAlign: "center", 
                         display: "block"
                }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
