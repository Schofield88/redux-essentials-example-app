import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../api/client';

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');

  return response.data;
});

export { fetchUsers };
