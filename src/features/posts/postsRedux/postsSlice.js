import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../../api/client';

const requestStatus = {
  idle: 'idle',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
};

const postsAdaptor = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialPostsState = postsAdaptor.getInitialState({
  status: requestStatus.idle,
  error: null,
});

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const { title, content, userId } = initialPost;
  const response = await client.post('/fakeApi/posts', {
    title,
    content,
    user: userId,
  });
  return response.data;
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
        postsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdaptor.addOne);
  },
});

console.log('postsAdaptor: ', postsAdaptor);

const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdaptor.getSelectors((state) => state.posts);

const { addPost, updatePost, addReaction } = postsSlice.actions;
const { reducer: postsReducer } = postsSlice;

export {
  addPost,
  addNewPost,
  updatePost,
  addReaction,
  postsReducer,
  requestStatus,
  fetchPosts,
  selectPostIds,
  selectPostById,
  selectAllPosts,
};
