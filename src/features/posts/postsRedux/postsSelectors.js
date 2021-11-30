import { createSelector } from '@reduxjs/toolkit';

const selectAllPosts = (state) => state.posts.posts;

const selectPostById = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId);

const selectPostsByUser = (userId) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.user === userId),
  );

export { selectAllPosts, selectPostById, selectPostsByUser };
