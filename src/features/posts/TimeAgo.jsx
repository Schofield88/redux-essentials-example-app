import { DateTime } from 'luxon';

const timeWithPlurarisation = (timeUnit, value) => {
  const floorValue = Math.floor(value);
  const sOrNah = floorValue === 1 ? '' : 's';

  return `${floorValue} ${timeUnit}${sOrNah}`;
};

const formatNiceTime = (times) => {
  const { minutes } = times;

  if (minutes < 1) {
    return 'Just now...';
  }

  const minutesAgo = timeWithPlurarisation('minute', minutes);

  return `${minutesAgo} ago`;
};

const TimeAgo = ({ date }) => {
  if (!date) {
    return <div>Date Unavailable</div>;
  }

  const postCreationDate = DateTime.fromISO(date);
  const rightNow = DateTime.now();
  const someCoolTimes = rightNow.diff(postCreationDate, [
    'days',
    'hours',
    'minutes',
  ]);

  const duration = formatNiceTime(someCoolTimes);

  const { days, hours, minutes } = someCoolTimes;
  console.log('days: ', days);
  console.log('hours: ', hours);
  console.log('minutes: ', minutes);

  return <div>{duration}</div>;
};

export { TimeAgo };
