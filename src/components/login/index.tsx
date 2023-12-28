
import { Controller, useForm } from "react-hook-form";
import InputTextCustom from "../common/InputTextCustom";
import ErrorMessageCustom from "../common/ErrorMessageCustom";
import PasswordCustom from "../common/PasswordCustom";
import { Button } from "primereact/button";

const Login = () => {

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
        data.userName = data.userName.trim();
        // const token = await login(data);
        // if (token) {
        //     const payload: any = jwt(token || "");
        //     localStorage.setItem("token", token);
        //     navigate("/event");
        // }
    };

    return (
        <div className="login-container bg-white">
                <div className="bg-login slide-in-left d-none d-xl-block">
                </div>
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
                                            {
                                                errors["userName"] &&
                                                <ErrorMessageCustom
                                                    error={errors["userName"]}
                                                />
                                            }
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
                                            {
                                                errors["passWord"] &&
                                                <ErrorMessageCustom
                                                    error={errors["passWord"]}
                                                />
                                            }
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        {/* <div className="row ">
                            <div className="col-7 d-flex align-items-center ">
                                <Controller
                                    name="memorize"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Checkbox
                                                inputId={field.name}
                                                checked={field.value}
                                                inputRef={field.ref}
                                                className={"mt-1"}
                                                style={{ width: "30px" }}
                                                onChange={(e) =>
                                                    field.onChange(e.checked)
                                                }
                                            />
                                            <label className="label-field fw-normal">
                                                {" "}
                                                Remember Me
                                            </label>
                                            <ErrorMessageCustom
                                                error={errors["memorize"]}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-5 mt-1 text-end">
                                <NavLink to={"/forgot-password"}>
                                    Forgotten password?
                                </NavLink>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-4">
                                <Button
                                    type="submit"
                                    className="w-100"
                                    label="Login"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mt-2">
                                <span className="me-1">Don't have an account?</span>
                                <NavLink to={"/register"}>
                                    Sign up
                                </NavLink>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default Login;