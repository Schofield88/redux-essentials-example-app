import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts/postsRedux/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
