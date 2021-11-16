const selectAllPosts = (state) => state.posts.posts;

const selectPostById = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId);

export { selectAllPosts, selectPostById };
