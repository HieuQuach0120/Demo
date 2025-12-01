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
    const link = url + "/register"; // Giả định API là /authen/register
    const res = await instance.post(link, params);
    return res?.data || null;
  } catch (error) {
    return null;
  }
}
