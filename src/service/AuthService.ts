import instance from ".";

const url = "/authen";

// login
export async function login(params: any) {
  try {
    const res = await instance.post(`${url}/login`, params);
    return res?.data?.data || null;
  } catch (error) {
    return null;
  }
}

// register
export async function register(params: {
  name: string;
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const res = await instance.post(`${url}/register`, params);
    return res.status === 200 || res.status === 201;
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    return false;
  }
}

//forgot password
export async function forgotPassword(email: string) {
  try {
    const res = await instance.post(`${url}/forgot-password`, { email });
    return {
      success: true,
      message: res.data?.message || "Done",
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Something went wrong. Please try again.";
    return {
      success: false,
      message,
    };
  }
}