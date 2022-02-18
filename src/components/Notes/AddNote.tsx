import { useLayoutEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { RiSendPlaneFill } from 'react-icons/ri';

import { db } from 'services/firebase.service';
import { getFormattedDate } from 'utils/helpers/date.helper';
import INote from 'types/Note';

const TITLE_LEN_LIMIT = 16;
const BODY_LEN_LIMIT = 60;

const AddNote = () => {
  const [noteData, setNoteData] = useState({
    title: '',
    body: '',
  } as Pick<INote, 'title' | 'body'>);
  const titleField = useRef<HTMLInputElement>(null);

  const currentDay = getFormattedDate();

  const handleChnage = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const addNote = async () => {
    if (!noteData.title || !noteData.body) {
      return;
    }

    setNoteData({
      title: '',
      body: '',
    } as INote);

    if (titleField.current) {
      titleField.current.focus();
    }
    const notesCollectionRef = collection(db, 'notes');

    await addDoc(notesCollectionRef, {
      ...noteData,
      saved: false,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <div className="relative p-10 pb-6 rounded-md bg-[#ffde9e]">
      <div className="mb-10">
        <input
          ref={titleField}
          type="text"
          name="title"
          value={noteData.title}
          maxLength={TITLE_LEN_LIMIT}
          placeholder="Your Title"
          onChange={handleChnage}
          className="w-full mb-3 bg-transparent text-3xl placeholder:text-[#cd9944] text-[#cd9944] outline-none"
        />

        <button
          className="absolute right-5 top-5 p-2 rounded bg-[#eec680] transition-rounded duration-300 hover:rounded-lg hover:bg-[#f7ca7e] active:bg-[#f7ca7e]"
          onClick={addNote}
        >
          <RiSendPlaneFill className="text-xl text-[#cd9944]" />
        </button>

        <span className="inline-block p-1 rounded bg-[#eec680] text-[#cd9944] text-sm font-semibold">
          <time>{currentDay}</time>
        </span>
      </div>

      <textarea
        name="body"
        value={noteData.body}
        placeholder="Write yout note..."
        maxLength={BODY_LEN_LIMIT}
        onChange={handleChnage}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addNote();
          }
        }}
        className="w-full h-16 bg-transparent placeholder:text-[#cd9944] text-[#cd9944] outline-none resize-none"
      />
    </div>
  );
};

export default AddNote;
