import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './userThunks';

const usersAdapter = createEntityAdapter();

const initialUsersState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

const { reducer: usersReducer } = usersSlice;

export { usersReducer, usersAdapter };
