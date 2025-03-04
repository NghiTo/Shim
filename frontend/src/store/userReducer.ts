import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.type";

const initialState: UserState = {
  email: "",
  role: "",
  isAuthUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthUser = action.payload.isAuthUser;
    },
    clearUser(state) {
      state.email = "";
      state.role = "";
      state.isAuthUser = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
