import spotifyAPI, { LOGIN_URL } from '@/lib/spotify';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

type Token = {
  name: string;
  email: string;
  sub: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  accessTokenExpires: number;
  iat: number;
  exp: number;
  jti: string;
};

async function refreshAccessToken(token: Token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken);
    spotifyAPI.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyAPI.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'refreshAccessTokenError',
    };
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
      clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
        };
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      return await refreshAccessToken(token as Token);
    },
    async session({ session, token }) {
      const updatedUser = {
        ...(session.user || {}),
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        username: token.username,
      };

      return {
        ...session,
        user: updatedUser,
      };
    },
  },
});

export { handler as GET, handler as POST };
