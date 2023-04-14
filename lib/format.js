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

  const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_MONTH = MS_PER_DAY * 30;
const MS_PER_YEAR = MS_PER_DAY * 365;

const getTimeDiffString = (timeValue, unit) => {
    return `${timeValue} ${unit}${timeValue > 1 ? 's' : ''} ago`;
}

const timeDiffArray = [
    { threshold: 0, value: 'a few seconds', unit: 'second' },
    { threshold: MS_PER_MINUTE, unit: 'minute' },
    { threshold: MS_PER_HOUR, unit: 'hour' },
    { threshold: MS_PER_DAY, unit: 'day' },
    { threshold: MS_PER_MONTH, value: 'approximately', unit: 'month' },
    { threshold: MS_PER_YEAR, value: 'approximately', unit: 'year' },
];

const getRelativeTime = (timestamp, currentTime = Date.now()) => {
    const difference = currentTime - timestamp;
    for (let i = timeDiffArray.length - 1; i >= 0; i--) {
        const { threshold, value, unit } = timeDiffArray[i];
        if (difference >= threshold) {
            const timeValue = Math.floor(difference / threshold);
            const timeDiffString = value 
                ? `${value} ${timeValue} ${unit}${timeValue > 1 ? 's' : ''} ago` 
                : getTimeDiffString(timeValue, unit);
            return timeDiffString;
        }
    }
    // return the string for 0 seconds
    return getTimeDiffString(0, 'second');
}
}

module.exports = format;
