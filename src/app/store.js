import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts/postsRedux/postsSlice';
import { usersReducer } from '../features/users/usersRedux/usersSlice';
import { notificationsReducer } from '../features/notificiations/notificationsRedux/notificationsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});
