import { configureStore } from '@reduxjs/toolkit';
import playlistSlice from './features/playlistSlice';
import songSlice from './features/songSlice';

export const store = configureStore({
  reducer: {
    playlist: playlistSlice,
    song: songSlice,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
