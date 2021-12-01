import { notificationsAdapter } from './notificationsSlice';

const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(
  (state) => state.notifications,
);

export { selectAllNotifications };
