import { formatNiceTimeFromDate } from '../../utils/timeUtils';

const TimeAgo = ({ date }) => {
  if (!date) {
    return <span>&nbsp;Date Unavailable</span>;
  }

  // const postCreationDate = DateTime.fromISO(date);
  // const rightNow = DateTime.now();
  // const someCoolTimes = rightNow.diff(postCreationDate, [
  //   'days',
  //   'hours',
  //   'minutes',
  // ]);

  return <span>&nbsp;{formatNiceTimeFromDate(date)}</span>;
};

export { TimeAgo };
