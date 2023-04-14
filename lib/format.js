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

  relativeTime: function(timestamp, currentTime = Date.now()) {

    const difference = currentTime - timestamp;

    const getElapsed = (value, unit) => {
        const suffix = value === 1 ? '' : 's';
        return `${value} ${unit}${suffix} ago`;
    }

    const elapsed = [
        { time: 60 * 1000, unit: 'second' },
        { time: 60 * 60 * 1000, unit: 'minute' },
        { time: 24 * 60 * 60 * 1000, unit: 'hour' },
        { time: 30 * 24 * 60 * 60 * 1000, unit: 'day' },
        { time: 12 * 30 * 24 * 60 * 60 * 1000, unit: 'month' },
        { time: Infinity, unit: 'year' },
    ];

    const { time, unit } = elapsed.find(({ time }) => difference < time);

    if (unit === 'year') {
        const yearsElapsed = Math.floor(difference / (365 * 24 * 60 * 60 * 1000));
        return `approximately ${getElapsed(yearsElapsed, unit)}`;
    }

    const value = Math.floor(difference / time);
    return getElapsed(value, unit);
}
}

module.exports = format;
