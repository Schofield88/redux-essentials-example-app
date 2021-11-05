import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ title, content, userId }) => ({
        payload: {
          id: nanoid(),
          title,
          content,
          user: userId,
          date: new Date().toISOString(),
        },
      }),
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);

      existingPost.title = title;
      existingPost.content = content;
    },
  },
});

const { addPost, updatePost } = postsSlice.actions;
const { reducer: postsReducer } = postsSlice;

export { addPost, updatePost, postsReducer };
