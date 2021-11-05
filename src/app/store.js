import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts/postsRedux/postsSlice';
import { usersReducer } from '../features/users/usersRedux/usersSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
