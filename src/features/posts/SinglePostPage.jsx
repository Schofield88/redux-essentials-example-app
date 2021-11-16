import { useSelector } from 'react-redux';
import { selectPostById } from './postsRedux/postsSelectors';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButton';

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

  const { title, content, user, id, date } = post;

  return (
    <section>
      <article className="post">
        <h2>{title}</h2>
        <PostAuthor userId={user} />
        <TimeAgo date={date} />
        <p className="post-content">{content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export { SinglePostPage };
