import instance from ".";

const url = "/authen";
// login
export async function login(params: any) {
  try {
    const link = url + "/login";
    const res = await instance.post(link, params);
    return res?.data?.data || null;
  } catch (error) {
    return null;
  }
}
export async function register(params: any) {
  try {
    const link = url + "/register";
    const res = await instance.post(link, params);
    return res?.data || null;
  } catch (error) {
    return null;
  }
}
export async function changePassword(params: any) {
  try {
    const link = url + "/change-password";
    const res = await instance.post(link, params);

    return { success: true, data: res?.data };
  } catch (error: any) {
    const apiMessage = error.response?.data?.message || "Lỗi kết nối Server";
    return { success: false, message: apiMessage };
  }
}
