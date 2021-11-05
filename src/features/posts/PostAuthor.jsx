import { useSelector } from 'react-redux';
import { selectUser } from '../users/usersRedux/usersSelectors';

const PostAuthor = ({ userId }) => {
  const author = useSelector(selectUser(userId));
  const name = author ? author.name : 'Unknown';

  return <div>{name}</div>;
};

export { PostAuthor };
