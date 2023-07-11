import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyAPI = new SpotifyWebApi({
  clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
  clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
});

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'refreshAccessTokenError') {
        signIn();
      }
      spotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}
