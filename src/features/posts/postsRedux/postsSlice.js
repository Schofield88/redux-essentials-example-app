import { createSlice, nanoid } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: DateTime.now().minus({ weeks: 1 }).toISO(),
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: DateTime.now().minus({ days: 1 }).toISO(),
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'Just a few hours ago',
    date: DateTime.now().minus({ hours: 3 }).toISO(),
  },
  {
    id: '4',
    title: 'Fourth Post',
    content: 'Just a few minutes ago',
    date: DateTime.now().minus({ minutes: 3 }).toISO(),
  },
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
          date: DateTime.now().toISO(),
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
