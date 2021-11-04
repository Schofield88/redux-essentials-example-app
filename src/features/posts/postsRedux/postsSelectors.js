const selectAllPosts = (state) => state.posts;

const selectPostById = (postId) => (state) =>
  state.posts.find((post) => post.id === postId);

export { selectAllPosts, selectPostById };
