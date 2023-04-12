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

  const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

function calculateDifference(timestamp, currentTime) {
  return Math.max(currentTime - timestamp, ONE_SECOND);
}

function formatTimeDifference(timeDiff, unit) {
  return `${timeDiff} ${unit}${timeDiff > 1 ? "s" : ""} ago`;
}

function relativeTime(timestamp, currentTime = Date.now()) {
  const difference = calculateDifference(timestamp, currentTime);
  if (difference < ONE_MINUTE) {
    const seconds = Math.floor(difference / ONE_SECOND);
    return formatTimeDifference(seconds, "second");
  } else if (difference < ONE_HOUR) {
    const minutes = Math.floor(difference / ONE_MINUTE);
    return formatTimeDifference(minutes, "minute");
  } else if (difference < ONE_DAY) {
    const hours = Math.floor(difference / ONE_HOUR);
    return formatTimeDifference(hours, "hour");
  } else if (difference < ONE_WEEK) {
    const days = Math.floor(difference / ONE_DAY);
    return formatTimeDifference(days, "day");
  } else if (difference < ONE_MONTH) {
    const weeks = Math.floor(difference / ONE_WEEK);
    return formatTimeDifference(weeks, "week");
  } else if (difference < ONE_YEAR) {
    const months = Math.floor(difference / ONE_MONTH);
    return formatTimeDifference(months, "month");
  } else {
    const years = Math.floor(difference / ONE_YEAR);
    return formatTimeDifference(years, "year");
  }
}
}

module.exports = format;
