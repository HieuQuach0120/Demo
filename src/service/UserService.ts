import instance from "./index";

const url = "/user";

// Lấy thông tin Profile
export async function getUserProfile() {
  try {
    const res = await instance.get(`${url}/profile`);

    return res?.data?.data || null;
  } catch (error) {
    return null;
  }
}

// Cập nhật thông tin text (Tên, SĐT, Email...)
export async function updateUserProfile(params: any) {
  try {
    const res = await instance.put(`${url}/update`, params);
    return res?.data || null;
  } catch (error) {
    throw error;
  }
}

// Upload Avatar
export async function uploadUserAvatar(file: File) {
  const formData = new FormData();

  formData.append("avatar", file);

  try {
    const res = await instance.post("/user/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi upload ảnh",
    };
  }
}
