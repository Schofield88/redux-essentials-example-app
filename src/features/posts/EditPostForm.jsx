import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectPostById } from './postsRedux/postsSelectors';
import { updatePost } from './postsRedux/postsSlice';

const EditPostForm = ({ match }) => {
  const { postId: id } = match.params;

  const post = useSelector(selectPostById(id));
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);

  const savePostChanges = () => {
    dispatch(updatePost({ id, title, content }));
    history.push(`/posts/${id}`);
  };

  return (
    <section>
      <h2>Edit Post</h2>
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
        <button type="button" onClick={savePostChanges}>
          Save Changes
        </button>
      </form>
    </section>
  );
};

export { EditPostForm };
