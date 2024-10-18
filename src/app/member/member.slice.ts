import { createSlice } from "@reduxjs/toolkit";
import { MemberInitStateTypes } from "./member.type";
import { baseFoldersById } from "./member.action";

const initialState: MemberInitStateTypes = {
  listMember: [],
  loadingMember: false,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(baseFoldersById.pending, (state, action) => {
      state.loadingMember = true;
    });
    builder.addCase(baseFoldersById.fulfilled, (state, action) => {
      state.listMember = action?.payload;
      state.loadingMember = false;
    });
    builder.addCase(baseFoldersById.rejected, (state, action) => {
      state.loadingMember = false;
    });
  },
});

export const selectMember = (state: any) => state.member;
export const {} = memberSlice.actions;

export default memberSlice.reducer;
