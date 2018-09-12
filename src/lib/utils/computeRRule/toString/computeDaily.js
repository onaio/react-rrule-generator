import RRule from 'rrule';

const computeDaily = ({ interval, frequency }) => ({
  freq: frequency !== undefined ? frequency : RRule.DAILY,
  interval,
});

export default computeDaily;
