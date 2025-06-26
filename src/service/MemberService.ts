import { toast } from "react-toastify";
import instance from ".";

const url = "/member";

//get list
export async function getListMember(data: any) {
  try {
    const link = url + "/get-list";
    const res = await instance.get(link, { params: data });
    return res.data?.data || null;
  } catch (error: any) {
    // Toast(error.message)
    return toast.error(error.response.data?.message || "Lỗi server.");
  }
}

//create
export async function createMember(data: any) {
  try {
    const link = url + "/create";
    console.log("data: ", data);
    const res = await instance.post(link, data);
    return res.data?.data || null;
  } catch (error: any) {
    // Toast(error.message)
    return toast.error(error.response.data?.message || "Lỗi server.");
  }
}
