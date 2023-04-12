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

function relativeTime(timestamp, currentTime = Date.now()) {
    const difference = currentTime - timestamp;

    if (difference < MS_PER_MINUTE) {
        const seconds = Math.floor(difference / 1000);
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (difference < MS_PER_HOUR) {
        const minutes = Math.floor(difference / MS_PER_MINUTE);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (difference < MS_PER_DAY) {
        const hours = Math.floor(difference / MS_PER_HOUR);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (difference < MS_PER_MONTH) {
        const days = Math.floor(difference / MS_PER_DAY);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (difference < MS_PER_YEAR) {
        const months = Math.floor(difference / MS_PER_MONTH);
        return `approximately ${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        const years = Math.floor(difference / MS_PER_YEAR);
        return `approximately ${years} year${years === 1 ? '' : 's'} ago`;
    }
}
}

module.exports = format;
