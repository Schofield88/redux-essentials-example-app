import { DateTime } from 'luxon';

const timeUnits = {
  day: 'day',
  hour: 'hour',
  minute: 'minute',
  second: 'second',
};

const timeWithPlurarisation = (timeUnit, value) => {
  const floorValue = Math.floor(value);
  const sOrNah = floorValue === 1 ? '' : 's';

  return `${floorValue} ${timeUnit}${sOrNah}`;
};

const formatNiceTime = (times) => {
  if (times.days) {
    return `${timeWithPlurarisation(timeUnits.day, times.days)} ago`;
  }

  if (times.hours) {
    return `${timeWithPlurarisation(timeUnits.hour, times.hours)} ago`;
  }

  if (times.minutes < 1) {
    return 'Just now...';
  }

  return `${timeWithPlurarisation(timeUnits.minute, times.minutes)} ago`;
};

const TimeAgo = ({ date }) => {
  if (!date) {
    return <span>&nbsp;Date Unavailable</span>;
  }

  const postCreationDate = DateTime.fromISO(date);
  const rightNow = DateTime.now();
  const someCoolTimes = rightNow.diff(postCreationDate, [
    'days',
    'hours',
    'minutes',
  ]);

  return <span>&nbsp;{formatNiceTime(someCoolTimes)}</span>;
};

export { TimeAgo };
