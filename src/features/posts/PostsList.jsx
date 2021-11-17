import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts } from './postsRedux/postsSelectors';
import { useEffect } from 'react';
import { fetchPosts, requestStatus } from './postsRedux/postsSlice';
import { Spinner } from '../../components/Spinner';
import { Post } from './Post';

const PostsWrapper = ({ children }) => {
  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {children}
    </section>
  );
};

const PostExcerpt = ({ post }) => {
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
  const posts = useSelector(selectAllPosts);
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

  if (postsStatus === requestStatus.succeeded) {
    const orderedPosts = [...posts].sort((a, b) =>
      b.date.localeCompare(a.date),
    );

    return (
      <PostsWrapper>
        {orderedPosts.map((post) => (
          <PostExcerpt post={post} key={post.id} />
        ))}
      </PostsWrapper>
    );
  }

  if (postsStatus === requestStatus.failed) {
    return (
      <PostsWrapper>
        <div>{postsError}</div>
      </PostsWrapper>
    );
  }

  return <PostsWrapper />;
};

export { PostsList };
