const BigNumber = require('bignumber.js');
const moment = require('moment');
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const NanoSecondsIn = {
  DAYS: '86400000000000',
  HOURS: '3600000000000',
  MINUTES: '60000000000',
  SECONDS: '1000000000',
  MILLISECONDS: '1000000',
  MICROSECONDS: '1000',
};

const TimeIn = {
  DAYS: 24,
  HOURS: 60,
  MINUTES: 60,
  SECONDS: 1000,
  MICROSECONDS: 1000,
  MILLISECONDS: 1000,
};

class NanoFormat {

    static toISOString(ns) {
      let nanoseconds = new BigNumber(ns);

      let hours = nanoseconds.dividedBy(NanoSecondsIn.HOURS).mod(TimeIn.DAYS).toFormat(0);
      let minutes = nanoseconds.dividedBy(NanoSecondsIn.MINUTES).mod(TimeIn.HOURS).toFormat(0);
      let seconds = nanoseconds.dividedBy(NanoSecondsIn.SECONDS).mod(TimeIn.MINUTES).toFormat(0);
      let milliseconds = nanoseconds.dividedBy(NanoSecondsIn.MILLISECONDS).mod(TimeIn.SECONDS).toFormat(0);
      let microseconds = nanoseconds.dividedBy(NanoSecondsIn.MICROSECONDS).mod(TimeIn.MILLISECONDS).toFormat(0);

      nanoseconds = nanoseconds.mod(TimeIn.MICROSECONDS).toFormat(0);

      const iso = moment()
        .hours(hours.toString())
        .minutes(minutes.toString())
        .seconds(seconds.toString())
        .milliseconds(milliseconds.toString())
        .toISOString();

      return iso;
    }

}

module.exports = NanoFormat;