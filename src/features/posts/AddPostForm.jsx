import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsRedux/postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);

  const addNewPost = () => {
    dispatch(addPost({ title, content }));

    setTitle('');
    setContent('');
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={addNewPost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export { AddPostForm };
