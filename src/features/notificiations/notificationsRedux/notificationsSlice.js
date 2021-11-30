import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../../api/client';
import { selectAllNotifications } from './notificationsSelectors';

const initialNotificationState = [];

const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`,
    );
    return response.data;
  },
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {
    allNotificationsRead: (state) => {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload);
      state.forEach((notification) => {
        notification.isNew = !notification.read;
      });
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

const { allNotificationsRead } = notificationSlice.actions;
const { reducer: notificationsReducer } = notificationSlice;

export { notificationsReducer, fetchNotifications, allNotificationsRead };
