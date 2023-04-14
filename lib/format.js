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

  const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY;
const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

function relativeTime(timestamp, currentTime = Date.now()) {
  const valuePerUnitTime = {
    [SECONDS_IN_MINUTE]: { unit: 'second', plural: 's' },
    [SECONDS_IN_HOUR]: { unit: 'minute', plural: 's' },
    [SECONDS_IN_DAY]: { unit: 'hour', plural: 's' },
    [SECONDS_IN_MONTH]: { unit: 'day', plural: 's' },
    [SECONDS_IN_YEAR]: { unit: 'year', plural: 's', approx: true },
  };
  const differenceInSeconds = Math.floor((currentTime - timestamp)/1000);

  for (const [time, { unit, plural, approx }] of Object.entries(valuePerUnitTime)) {   
    if (differenceInSeconds < time) {
      const numberOfUnits = Math.floor(differenceInSeconds / (approx ? (time / SECONDS_IN_MONTH) : time));
      return approx ? `approximately ${numberOfUnits} ${unit}${numberOfUnits === 1 ? '' : plural} ago` : `${numberOfUnits} ${unit}${numberOfUnits === 1 ? '' : plural} ago`;
    }
  }
}
}

module.exports = format;
