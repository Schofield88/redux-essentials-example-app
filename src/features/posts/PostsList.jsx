import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllPosts } from './postsRedux/postsSelectors';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <PostAuthor userId={post.user} />
          <TimeAgo date={post.date} />
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      ))}
    </section>
  );
};

export { PostsList };
