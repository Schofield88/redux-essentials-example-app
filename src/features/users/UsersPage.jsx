import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from './usersRedux/usersSelectors';

const UserLink = ({ user }) => {
  return (
    <div>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  );
};

const UsersPage = () => {
  const users = useSelector(selectAllUsers);

  return (
    <section className={'posts-list'}>
      <h2>Users</h2>
      {users.map((user) => (
        <UserLink user={user} key={user.id} />
      ))}
    </section>
  );
};

export { UsersPage };
