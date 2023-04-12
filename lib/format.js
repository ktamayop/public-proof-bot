let format = {

  currency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }),

  salary: function(salary) {
    return salary ? this.currency.format(salary) : 'n/a';
  },

  hourlyRate: function(hourlyRate) {
    return hourlyRate ? this.currency.format(hourlyRate) + ' per hour' : 'n/a';
  },

  const timeIntervals = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
  ['second', 1000],
];

const isPlural = (value, unit) => (value == 1 ? unit.slice(0, -1) : unit);

const getElapsedTime = (timestamp, currentTime = Date.now()) => {
  const elapsedTimeInMs = currentTime - timestamp;
  const years = Math.floor(elapsedTimeInMs / timeIntervals[0][1]);
  const remainder = elapsedTimeInMs % timeIntervals[0][1];
  let remainingInterval = timeIntervals.slice(1).find(([, value]) => remainder >= value);
  if (!remainingInterval) remainingInterval = timeIntervals[timeIntervals.length - 1];
  const [interval, value] = remainingInterval;
  return `${years > 0 ? `${years} year${isPlural(years, 'years')} and ` : ''}${Math.floor(remainder / value)} ${interval}${isPlural(Math.floor(remainder / value), interval)} ago`;
};

const relativeTime = (timestamp, currentTime = Date.now(), format = 'default') => {
  let output = '';
  switch (format) {
    case 'default':
      output = getElapsedTime(timestamp, currentTime);
      break;
    case 'approx':
      output = `approximately ${getElapsedTime(timestamp, currentTime)}`;
      break;
    default:
      throw new Error(`Unrecognized format option: ${format}`);
  }
  return output === '' ? 'just now' : output;
};
}

module.exports = format;
