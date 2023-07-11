import { useEffect, useState } from 'react';
import type { ReduxState } from '@/store';
import useSpotify from './useSpotify';
import { useSelector } from 'react-redux';

export default function useSongInfo() {
  const spotifyAPI = useSpotify();
  const { id: songId } = useSelector((state: ReduxState) => state.song);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (songId) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [spotifyAPI, songId]);

  return songInfo;
}
