import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  requestStatus,
  selectPostById,
  selectPostIds,
} from './postsRedux/postsSlice';
import { Spinner } from '../../components/Spinner';
import { Post } from './Post';
import { fetchPosts } from './postsRedux/postThunks';

const PostsWrapper = ({ children }) => {
  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {children}
    </section>
  );
};

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <Post post={post} content={`${post.content.substring(0, 97)}...`} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector((state) => state.posts.status);
  const postsError = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postsStatus === requestStatus.idle) {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  if (postsStatus === requestStatus.pending) {
    return <Spinner text={'Loading...'} />;
  }

  if (postsStatus === requestStatus.failed) {
    return (
      <PostsWrapper>
        <div>{postsError}</div>
      </PostsWrapper>
    );
  }

  if (postsStatus === requestStatus.succeeded) {
    return (
      <PostsWrapper>
        {orderedPostIds.map((postId) => {
          return <PostExcerpt postId={postId} key={postId} />;
        })}
      </PostsWrapper>
    );
  }

  return <PostsWrapper />;
};

export { PostsList };
