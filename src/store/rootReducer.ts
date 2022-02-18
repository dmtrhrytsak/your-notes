import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './features/notes.slice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
