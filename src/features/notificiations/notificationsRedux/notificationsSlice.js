import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from './notificationThunks';

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialNotificationState = notificationsAdapter.getInitialState();

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {
    allNotificationsRead: (state) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });
    });
  },
});

const { allNotificationsRead } = notificationSlice.actions;
const { reducer: notificationsReducer } = notificationSlice;

export { notificationsReducer, allNotificationsRead, notificationsAdapter };
