import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButton';

const Post = ({ content, post }) => (
  <>
    <PostAuthor userId={post.user} />
    <TimeAgo date={post.date} />
    <p className="post-content">{content}</p>
    <ReactionButtons post={post} />
  </>
);

export { Post };
