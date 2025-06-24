import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListMember } from "../../service/MemberService";

export const baseFoldersById = createAsyncThunk(
  "doc/getListMember",
  async (data: any, thunkAPI) => {
    try {
      return await getListMember(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
