import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.type";

const initialState: UserState = {
  id: "",
  email: "",
  role: "",
  avatarUrl: "",
  isAuthUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatarUrl = action.payload.avatarUrl;
      state.isAuthUser = action.payload.isAuthUser;
    },
    clearUser(state) {
      state.id = "";
      state.email = "";
      state.role = "";
      state.avatarUrl = "";
      state.isAuthUser = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
