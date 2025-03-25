import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user";

const initialState: UserState = {
  id: "",
  schoolId: "",
  email: "",
  role: "",
  avatarUrl: "",
  isAuthUser: false,
  isGoogleAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.schoolId = action.payload.schoolId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatarUrl = action.payload.avatarUrl;
      state.isAuthUser = action.payload.isAuthUser;
      state.isGoogleAuth = action.payload.isGoogleAuth;
    },
    clearUser(state) {
      state.id = "";
      state.schoolId = "";
      state.email = "";
      state.role = "";
      state.avatarUrl = "";
      state.isAuthUser = false;
      state.isGoogleAuth = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
