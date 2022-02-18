import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import INote from 'types/Note';

type State = {
  notes: INote[] | null;
};

const initialState: State = {
  notes: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
});

export default notesSlice.reducer;
