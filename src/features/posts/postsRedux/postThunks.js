import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../api/client';

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

export { addNewPost, fetchPosts };
