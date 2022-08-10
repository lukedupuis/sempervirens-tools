import moment from 'moment';

function timestamp(format) {
  return `[${moment().format(format || 'MM-DD-YY hh:mm:ssa')}]`;
}

export default timestamp;