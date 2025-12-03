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

// delete
export async function deleteMember(id: any) {
  try {
    const link = url + "/delete/" + id;

    const res = await instance.delete(link);
    return res.data;
  } catch (error: any) {
    return toast.error(error.response?.data?.message || "Lỗi server.");
  }
}
export async function getDetailMember(id: any) {
  try {
    const link = url + "/find/" + id;
    const res = await instance.get(link);

    return res.data?.data || res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      toast.error("Không tìm thấy member");
      return null;
    }

    toast.error(error.response?.data?.message || "Lỗi server.");
    return null;
  }
}
