const selectAllUsers = (state) => state.users;

const selectUser = (userId) => (state) =>
  state.users.find((user) => user.id === userId);

export { selectAllUsers, selectUser };
