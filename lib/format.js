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

  const getRelativeTimeDiff = (timestamp, currentTime = Date.now()) => {
  const msPerTimeUnit = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 365
  };

  const timeDiff = currentTime - timestamp;
  const abbreviation = (value, unit) => `${value} ${unit}${value === 1 ? '' : 's'} ago`;

  if (timeDiff < msPerTimeUnit.minute) {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.second), 'second');
  } 
  else if (timeDiff < msPerTimeUnit.hour) {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.minute), 'minute');
  }
  else if (timeDiff < msPerTimeUnit.day) {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.hour), 'hour');
  }
  else if (timeDiff < msPerTimeUnit.month) {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.day), 'day');
  }
  else if (timeDiff < msPerTimeUnit.year) {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.month), 'month');
  }
  else {
    return abbreviation(Math.floor(timeDiff / msPerTimeUnit.year), 'year');
  }
};
}

module.exports = format;
