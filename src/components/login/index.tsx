
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
    };

    return (
        <>
            <div className="login">
                <div className="login-image slide-in-left d-none d-xl-block"></div>
                <div className="form-login">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <div className="row">
                            <div className="col-12 mt-4">
                                <Button
                                    type="submit"
                                    className="w-100"
                                    label="Login"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;