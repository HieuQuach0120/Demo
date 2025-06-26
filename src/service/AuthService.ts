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
