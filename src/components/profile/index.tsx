import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { getUserInfo, updateUserInfo } from "../../service/AuthService";

const token = localStorage.getItem("token");
const user = token ? jwt(token) : null;

const UserComponent = () => {
  const [form, setForm] = useState({ email: "", phoneNumber: "" });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState<{ email: string; phoneNumber: string }>({
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Gọi API lấy thông tin user khi component mount
    const fetchUser = async () => {
      const res = await getUserInfo();
      if (res) {
        setUserInfo({
          email: res.email || "",
          phoneNumber: res.phoneNumber || "",
        });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: form.email || userInfo.email,
      phoneNumber: form.phoneNumber || userInfo.phoneNumber,
    };
    const res = await updateUserInfo(data);
    setMessage(res.message);
    if (res.success) {
      setUserInfo(data);
      setForm({ email: "", phoneNumber: "" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h1 className="mb-4">User Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder={userInfo.email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại:</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="form-control"
            placeholder={userInfo.phoneNumber}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cập nhật
        </button>
      </form>
      {message && (
        <div className="alert alert-success mt-3">{message}</div>
      )}
    </div>
  );
};

export default UserComponent;