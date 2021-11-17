import { useSelector } from 'react-redux';
import { selectUser } from './usersRedux/usersSelectors';
import { selectPostsByUser } from '../posts/postsRedux/postsSelectors';
import { Post } from '../posts/Post';

const SingleUserPage = ({ match }) => {
  const { userId } = match.params;
  const user = useSelector(selectUser(userId));
  const posts = useSelector(selectPostsByUser(userId));

  return (
    <section className={'posts-list'}>
      <h2>{user.name}</h2>
      {posts.map((post) => (
        <Post post={post} content={post.content} key={post.id} />
      ))}
    </section>
  );
};

export { SingleUserPage };
