import { DateTime } from 'luxon';

const timeUnits = {
  day: 'day',
  hour: 'hour',
  minute: 'minute',
  second: 'second',
};

const timeWithPluralisation = (timeUnit, value) => {
  const floorValue = Math.floor(value);
  const sOrNah = floorValue === 1 ? '' : 's';

  return `${floorValue} ${timeUnit}${sOrNah}`;
};

const formatNiceTimeFromDate = (date) => {
  const dateFromISO = DateTime.fromISO(date);
  const rightNow = DateTime.now();
  const times = rightNow.diff(dateFromISO, ['days', 'hours', 'minutes']);

  if (times.days) {
    return `${timeWithPluralisation(timeUnits.day, times.days)} ago`;
  }

  if (times.hours) {
    return `${timeWithPluralisation(timeUnits.hour, times.hours)} ago`;
  }

  if (times.minutes < 1) {
    return 'Just now...';
  }

  return `${timeWithPluralisation(timeUnits.minute, times.minutes)} ago`;
};

export { formatNiceTimeFromDate };
