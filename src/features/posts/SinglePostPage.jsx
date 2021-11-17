import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsRedux/postsSelectors';
import { Post } from './Post';

const SinglePostPage = ({ match }) => {
  const { postId } = match.params;
  const post = useSelector(selectPostById(postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <Post post={post} content={post.content} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export { SinglePostPage };
