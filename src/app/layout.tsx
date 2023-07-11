import './globals.css';
import { NextAuthProvider, ReduxProvider } from './providers';

export const metadata = {
  title: 'Spotify',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <ReduxProvider>
          <body className="bg-black h-screen overflow-hidden">{children}</body>
        </ReduxProvider>
      </NextAuthProvider>
    </html>
  );
}
