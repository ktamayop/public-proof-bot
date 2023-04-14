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

  formatTime: function(timestamp, currentTime = Date.now()) {
  const msPer = {
    year: 31556952000,
    month: 2629746000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
  };

  if (!timestamp || isNaN(timestamp) || isNaN(currentTime)) {
    return 'Invalid arguments: timestamp and currentTime should be valid numbers.';
  }

  let difference = currentTime - timestamp;

  for (let unit in msPer) {
    if (difference >= msPer[unit]) {
      const numUnitsAgo = Math.floor(difference / msPer[unit]);
      return `${numUnitsAgo} ${unit}${numUnitsAgo > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}
}

module.exports = format;
