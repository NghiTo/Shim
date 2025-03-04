import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.type";

const initialState: UserState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.email = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
