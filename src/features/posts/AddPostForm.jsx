import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, requestStatus } from './postsRedux/postsSlice';
import { selectAllUsers } from '../users/usersRedux/usersSelectors';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState(requestStatus.idle);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

  const isSavable =
    [title, content, userId].every(Boolean) &&
    addRequestStatus === requestStatus.idle;

  const addPost = async () => {
    if (isSavable) {
      try {
        setAddRequestStatus(requestStatus.pending);
        await dispatch(addNewPost({ title, content, userId })).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save post: ', error);
      } finally {
        setAddRequestStatus(requestStatus.idle);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={addPost} disabled={!isSavable}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export { AddPostForm };
