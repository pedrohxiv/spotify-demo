import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    error: string;
    user: {
      accessToken: string;
      image: string;
      name: string;
    };
  }
}
