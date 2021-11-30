import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNiceTimeFromDate } from '../../utils/timeUtils';
import { selectAllUsers } from '../users/usersRedux/usersSelectors';
import { selectAllNotifications } from './notificationsRedux/notificationsSelectors';
import { allNotificationsRead } from './notificationsRedux/notificationsSlice';
import classNames from 'classnames';

const NotificationsList = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const timeAgo = formatNiceTimeFromDate(notification.date);
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    };

    const notificationClassName = classNames('notification', {
      new: notification.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo}</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export { NotificationsList };
