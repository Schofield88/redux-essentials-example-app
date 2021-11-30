import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../../api/client';

const initialUsersState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');

  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload);
  },
});

const { reducer: usersReducer } = usersSlice;

export { usersReducer, fetchUsers };
