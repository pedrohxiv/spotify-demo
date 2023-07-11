'use client';

import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
