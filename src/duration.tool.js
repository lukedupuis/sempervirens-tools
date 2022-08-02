import moment from 'moment';

function duration(start, end) {
  if (start instanceof Date) start = moment(start);
  if (!end) end = moment();
  const duration = moment.duration(end.diff(start));
  let h = parseInt((duration / (1000 * 60 * 60)) % 24);
  let m = parseInt((duration / (1000 * 60)) % 60);
  let s = parseInt((duration / 1000) % 60);
  const ms = parseInt((duration % 1000) / 100);
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  return `${h}:${m}:${s}.${ms}`;
}

export default duration;
