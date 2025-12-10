import { toast } from "react-toastify";
import instance from ".";

const url = "/user";

export async function getListAdmin(params: any) {
  try {
    const link = url + "/get-list";
    const res = await instance.get(link, { params });

    return res.data?.data || null;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Lỗi lấy danh sách Admin.");
    return null;
  }
}

export async function getDetailAdmin(id: any) {
  try {
    const link = url + "/find/" + id;
    const res = await instance.get(link);
    return res.data?.data || res.data;
  } catch (error: any) {
    return null;
  }
}
