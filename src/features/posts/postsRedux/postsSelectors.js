import { createSelector } from '@reduxjs/toolkit';
import { selectAllPosts } from './postsSlice';

const selectPostsByUser = (userId) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.user === userId),
  );

export { selectPostsByUser };
