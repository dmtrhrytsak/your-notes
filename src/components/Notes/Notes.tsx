import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from 'services/firebase.service';
import { AddNote, StickyNote } from '.';
import INote from 'types/Note';

const Notes = () => {
  const [notes, setNotes] = useState<INote[] | null>(null);

  useEffect(() => {
    const notesCollectionRef = collection(db, 'notes');
    const orderedNotesQuery = query(
      notesCollectionRef,
      orderBy('createdAt', 'desc')
    );

    const usubscribe = onSnapshot(orderedNotesQuery, (snapshot) => {
      const notes = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as INote)
      );

      setNotes(notes);
    });

    return usubscribe;
  }, []);

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, 'notes', id);

    await deleteDoc(noteRef);
  };

  const saveNote = async (id: string) => {
    const noteRef = doc(db, 'notes', id);
    const noteSnap = await getDoc(noteRef);

    const note = noteSnap.data() as INote;

    await updateDoc(noteRef, { saved: !note.saved });
  };

  return (
    <section>
      <div className="flex items-center mb-7">
        <h1 className="text-3xl">Notes</h1>
        <img src="./logo.svg" alt="" className="w-16 mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AddNote />

        {notes?.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            saved={note.saved}
            createdAt={note.createdAt}
            handleDelete={deleteNote}
            handleSave={saveNote}
          />
        ))}
      </div>
    </section>
  );
};

export default Notes;
