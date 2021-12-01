import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllNotifications } from '../features/notificiations/notificationsRedux/notificationsSelectors';
import { fetchNotifications } from '../features/notificiations/notificationsRedux/notificationThunks';

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numberOfUnreadNotifications = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  const unreadNotificationsBadge = () => {
    if (numberOfUnreadNotifications > 0) {
      return <span className={'badge'}>{numberOfUnreadNotifications}</span>;
    }
  };

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <div className="navLinks">
              <Link to="/">Posts</Link>
              <Link to="/users">Users</Link>
              <Link to="/notifications">
                Notifications {unreadNotificationsBadge()}
              </Link>
            </div>
            <button className="button" onClick={fetchNewNotifications}>
              Refresh Notifications
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};
