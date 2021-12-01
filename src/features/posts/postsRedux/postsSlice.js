import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addNewPost } from './postThunks';
import { fetchPosts } from './postThunks';

const requestStatus = {
  idle: 'idle',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
};

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialPostsState = postsAdapter.getInitialState({
  status: requestStatus.idle,
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];

      existingPost.title = title;
      existingPost.content = content;
    },
    addReaction: (state, action) => {
      const { id, name } = action.payload;
      const existingPost = state.entities[id];

      if (!existingPost.reactions[name]) {
        existingPost.reactions[name] = 1;
      } else {
        existingPost.reactions[name]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = requestStatus.pending;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = requestStatus.succeeded;
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

const { addPost, updatePost, addReaction } = postsSlice.actions;
const { reducer: postsReducer } = postsSlice;

export {
  addPost,
  updatePost,
  addReaction,
  postsReducer,
  requestStatus,
  selectPostIds,
  selectPostById,
  selectAllPosts,
};
