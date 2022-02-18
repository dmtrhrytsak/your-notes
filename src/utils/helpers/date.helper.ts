import { Timestamp } from 'firebase/firestore';

export const getFormattedDate = (date?: Timestamp) => {
  const currentDate = date ? date.toDate() : new Date();

  const month = currentDate.getUTCMonth() + 1;
  const day = currentDate.getUTCDate();
  const year = currentDate.getUTCFullYear();

  return year + '/' + month + '/' + day;
};
