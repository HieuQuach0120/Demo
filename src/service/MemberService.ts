import { toast } from "react-toastify";
import instance from ".";
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = "/member";

// get list
export async function getListMember(data: any) {
  try {
    const link = `${url}/get-list`;
    const res = await instance.get(link, { params: data });
    return res.data?.data || null;
  } catch (error: any) {
    return toast.error(error.response?.data?.message || "Lỗi server.");
  }
}

// create
export async function createMember(data: any) {
  try {
    const link = `${url}/create`;
    const res = await instance.post(link, data);
    return res.data?.data || null;
  } catch (error: any) {
    return toast.error(error.response?.data?.message || "Lỗi server.");
  }
}

// delete 
export async function deleteMemberById(id: number) {
  try {
    const link = `${url}/delete/${id}`;
    const res = await instance.delete(link);
    return res.data?.data || null;
  } catch (error: any) {
    return toast.error(error.response?.data?.message || "Lỗi server.");
  }
}

// update
export async function updateMember(id: number, data: any) {
  try {
    const link = `${url}/update/${id}`;
    console.log("Updating member:", { id, data });
    const res = await instance.put(link, data);
    return res.data?.data || null;
  } catch (error: any) {
    return toast.error(error.response?.data?.message || "Lỗi server.");
  }
}
