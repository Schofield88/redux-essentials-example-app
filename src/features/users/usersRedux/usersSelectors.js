import { usersAdapter } from './usersSlice';

const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

const selectUser = (userId) => (state) => selectUserById(state, userId);

export { selectAllUsers, selectUser };
