import { createSlice } from '@reduxjs/toolkit';

export const playlist = createSlice({
  name: 'playlist',

  initialState: {
    id: '',
  },

  reducers: {
    changeId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeId } = playlist.actions;
export default playlist.reducer;
