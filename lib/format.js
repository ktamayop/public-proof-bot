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

  const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_MONTH = MS_PER_DAY * 30;
const MS_PER_YEAR = MS_PER_DAY * 365;

function formatPlural(value, unit) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

function isTimestampValid(timestamp, currentTime) {
  return timestamp && currentTime && !isNaN(timestamp) && !isNaN(currentTime);
}

function formatRelativeTime(timestamp, currentTime = Date.now()) {
  if (!isTimestampValid(timestamp, currentTime)) {
    throw new Error('Invalid input');
  }

  const difference = currentTime - timestamp;
  const units = [
    { limit: MS_PER_MINUTE, divisor: 1000, unit: 'second' },
    { limit: MS_PER_HOUR, divisor: MS_PER_MINUTE, unit: 'minute' },
    { limit: MS_PER_DAY, divisor: MS_PER_HOUR, unit: 'hour' },
    { limit: MS_PER_MONTH, divisor: MS_PER_DAY, unit: 'day' },
    { limit: MS_PER_YEAR, divisor: MS_PER_MONTH, unit: 'month' },
    { limit: Infinity, divisor: MS_PER_YEAR, unit: 'year' }
  ];

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    if (difference < unit.limit) {
      const value = Math.floor(difference / unit.divisor);
      return value <= 1 
        ? `${value} ${unit.unit} ago` 
        : `approximately ${formatPlural(value, unit.unit)} ago`;
    }
  }
}
}

module.exports = format;
