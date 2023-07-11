import { createSlice } from '@reduxjs/toolkit';

export const song = createSlice({
  name: 'song',

  initialState: {
    id: '',
    isPlaying: false,
  },

  reducers: {
    changeId: (state, action) => {
      state.id = action.payload;
    },
    changeIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { changeId, changeIsPlaying } = song.actions;
export default song.reducer;
