import instance from ".";

const url = "/authen";

export async function forgotPassword(email: string) {
  try {
    const res = await instance.post(`${url}/forgot-password`, { email });
    return res?.data || null;
  } catch (error) {
    return null;
  }
}
