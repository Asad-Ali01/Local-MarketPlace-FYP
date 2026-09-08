import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  onlineUsersIds: [] as string[],
  unreadCounts: {} as Record<string, number>,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    userOnline: (state, action: PayloadAction<string>) => {
      if (!state.onlineUsersIds.includes(action.payload)) {
        state.onlineUsersIds.push(action.payload);
      }
    },
    userOffline: (state, action: PayloadAction<string>) => {
      const offlineUserId = action.payload;
      state.onlineUsersIds = state.onlineUsersIds.filter((onlineId) => onlineId !== offlineUserId);
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsersIds = [...new Set([...state.onlineUsersIds, ...action.payload])];
    },
    setUnreadCounts: (state, action: PayloadAction<Record<string, number>>) => {
      state.unreadCounts = action.payload;
    },
    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      state.unreadCounts[conversationId] = (state.unreadCounts[conversationId] || 0) + 1;
    },
    clearUnreadCount: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;

      state.unreadCounts[conversationId] = 0;
    },
  },
});

export const {
  userOnline,
  userOffline,
  setOnlineUsers,
  setUnreadCounts,
  incrementUnreadCount,
  clearUnreadCount,
} = chatSlice.actions;

export default chatSlice.reducer;
