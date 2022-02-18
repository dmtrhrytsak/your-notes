import { Timestamp } from 'firebase/firestore';

interface INote {
  id: string;
  title: string;
  body: string;
  saved: boolean;
  createdAt: Timestamp;
}

export default INote;
