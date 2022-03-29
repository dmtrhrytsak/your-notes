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
import { useAuthContext } from 'utils/contexts/auth.context';
import { AddNote, StickyNote } from 'components/Notes';
import INote from 'types/Note';

const Notes = () => {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState<INote[] | null>(null);

  useEffect(() => {
    const notesCollectionRef = collection(db, 'users', user!.uid, 'notes');

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
  }, [user]);

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, 'users', user!.uid, 'notes', id);

    await deleteDoc(noteRef);
  };

  const saveNote = async (id: string) => {
    const noteRef = doc(db, 'users', user!.uid, 'notes', id);
    const noteSnap = await getDoc(noteRef);

    const note = noteSnap.data() as INote;

    await updateDoc(noteRef, { saved: !note.saved });
  };

  return (
    <section className="py-5 md:py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AddNote />

        {!notes ? (
          <p className="fixed z-10 top-2/4 left-2/4 text-4xl translate-y-[-50%] translate-x-[-50%] sm:text-5xl">
            Loading...
          </p>
        ) : (
          notes?.map((note) => (
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
          ))
        )}
      </div>
    </section>
  );
};

export default Notes;
