import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('MMM D, YYYY');
};

export const formatDateTime = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('MMM D, YYYY h:mm A');
};

export const getRelativeTime = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.fromNow();
};

export const getDayName = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('ddd');
};

export const getMonthName = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('MMM');
};

export const formatChartDate = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('MM/DD');
};