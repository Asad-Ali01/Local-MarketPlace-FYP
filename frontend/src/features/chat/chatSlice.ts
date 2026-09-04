import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  onlineUsersIds: [] as string[],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userOnline: (state, action: PayloadAction<string>) => {
      if (!state.onlineUsersIds.includes(action.payload)) {
        state.onlineUsersIds.push(action.payload);
      }
    },
    userOffline: (state, action: PayloadAction<string>) => {
      const offlineUserId = action.payload;
      state.onlineUsersIds = state.onlineUsersIds.filter(
        (onlineId) => onlineId !== offlineUserId,
      );
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
  state.onlineUsersIds = [
    ...new Set([...state.onlineUsersIds, ...action.payload]),
  ];
},
  },
});

export const { userOnline, userOffline, setOnlineUsers } = chatSlice.actions;

export default chatSlice.reducer;
