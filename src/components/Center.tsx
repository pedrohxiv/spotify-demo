'use client';

import useSpotify from '@/hooks/useSpotify';
import type { ReduxDispatch, ReduxState } from '@/store';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { millisecondsToMinutesAndSeconds } from '@/lib/time';
import { changeId, changeIsPlaying } from '@/store/features/songSlice';

const colors = [
  'from-amber-500',
  'from-blue-500',
  'from-cyan-500',
  'from-emerald-500',
  'from-fuchsia-500',
  'from-gray-500',
  'from-green-500',
  'from-indigo-500',
  'from-lime-500',
  'from-neutral-500',
  'from-orange-500',
  'from-pink-500',
  'from-purple-500',
  'from-red-500',
  'from-rose-500',
  'from-slate-500',
  'from-sky-500',
  'from-stone-500',
  'from-teal-500',
  'from-violet-500',
  'from-yellow-500',
  'from-zinc-500',
];

export default function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState('');
  const playlistId = useSelector((state: ReduxState) => state.playlist.id);
  const spotifyAPI = useSpotify();
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();
  const dispatch = useDispatch<ReduxDispatch>();

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      spotifyAPI.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
      });
    }
  }, [spotifyAPI, playlistId]);

  const playSong = (trackId: string, trackUri: string) => {
    dispatch(changeId(trackId));
    dispatch(changeIsPlaying(true));
    spotifyAPI.play({
      uris: [trackUri],
    });
  };

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 ">
        <div
          className="flex items-center bg-black text-white font-semibold space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => signOut()}
        >
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              height={40}
              width={40}
              alt="Profile Picture"
              className="rounded-full w-10 h-10"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
          <h2>{session?.user?.name}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </header>
      {playlistId ? (
        <>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}
          >
            {playlist?.images && (
              <Image
                src={playlist?.images?.[0]?.url}
                height={176}
                width={176}
                alt="Playlist"
                className="h-44 w-44 shadow-2xl"
              />
            )}
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {playlist?.name}
              </h1>
            </div>
          </section>
          <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
            {playlist?.tracks?.items.map(({ track }, index) => {
              if (track) {
                return (
                  <div
                    key={track.id}
                    className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
                    onClick={() => playSong(track.id, track.uri)}
                  >
                    <div className="flex items-center space-x-4">
                      <p>{index + 1}</p>
                      <Image
                        src={track.album.images[0].url}
                        width={40}
                        height={40}
                        alt={track.name}
                        className="h-10 w-10"
                      />
                      <div>
                        <p className="w-36 lg:w-64 text-white truncate">{track.name}</p>
                        <p className="w-40">{track.artists[0].name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between ml-auto md:ml-0">
                      <p className="w-40 hidden md:inline">{track.album.name}</p>
                      <p>{millisecondsToMinutesAndSeconds(track.duration_ms)}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </>
      ) : (
        <>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-1/2 text-white p-8`}
          >
            <div className="flex flex-col w-full">
              <h1 className="text-4xl font-bold mx-4 my-2">Good morning</h1>
              <div className="grid grid-cols-3 grid-rows-2 w-full">
                {[
                  {
                    category: 'Pop',
                    image:
                      'https://images.unsplash.com/photo-1688311899620-431a031bb078?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTUyNA&ixlib=rb-4.0.3&q=80&w=800',
                  },
                  {
                    category: 'Rock',
                    image:
                      'https://images.unsplash.com/photo-1686354715732-7e4685269a25?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTcxOA&ixlib=rb-4.0.3&q=80&w=800',
                  },
                  {
                    category: 'Rap',
                    image:
                      'https://images.unsplash.com/photo-1686956192134-2a6ecfb2258a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTUwMQ&ixlib=rb-4.0.3&q=80&w=800',
                  },
                  {
                    category: 'Indie',
                    image:
                      'https://images.unsplash.com/photo-1686172932727-1762e5b81f5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTY4Mg&ixlib=rb-4.0.3&q=80&w=800',
                  },
                  {
                    category: 'Jazz',
                    image:
                      'https://images.unsplash.com/photo-1687023519201-b29219d5b6af?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTY4NA&ixlib=rb-4.0.3&q=80&w=800',
                  },
                  {
                    category: 'Electronic',
                    image:
                      'https://images.unsplash.com/photo-1686371030320-cd87fce1c09e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUwOTY5OA&ixlib=rb-4.0.3&q=80&w=800',
                  },
                ].map(({ category, image }) => (
                  <div
                    key={image}
                    className="flex items-center bg-gray-500/30 rounded-md mx-4 my-2"
                  >
                    <Image
                      src={image}
                      width={80}
                      height={80}
                      alt={category}
                      className="rounded-md h-20 w-20"
                    />
                    <h3 className="ml-6 font-bold">{category}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="px-8">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-white text-2xl font-bold mx-4 my-2">
                Your heavy rotation
              </h1>
              <h2 className="text-white/40 text-base font-semibold mx-4 my-2">
                SEE MORE
              </h2>
            </div>
            <div className="grid grid-cols-5 grid-rows-1 w-full">
              {[
                {
                  title: 'Be Happy',
                  subtitle: 'Gane Evans',
                  image:
                    'https://plus.unsplash.com/premium_photo-1666899940579-6c931e34d52c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUxNjExNQ&ixlib=rb-4.0.3&q=80&w=800',
                },
                {
                  title: 'Some Days',
                  subtitle: 'Ira Wolf',
                  image:
                    'https://plus.unsplash.com/premium_photo-1670270204756-d53bd70589a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUxNjExNw&ixlib=rb-4.0.3&q=80&w=800',
                },
                {
                  title: 'Chime',
                  subtitle: 'Alan Gogail',
                  image:
                    'https://plus.unsplash.com/premium_photo-1686090450488-48ce19426bbe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUxNjExOQ&ixlib=rb-4.0.3&q=80&w=800',
                },
                {
                  title: 'Runaway',
                  subtitle: 'Beauty Coast',
                  image:
                    'https://plus.unsplash.com/premium_photo-1664279047256-68a661042cf0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUxNjEyMQ&ixlib=rb-4.0.3&q=80&w=800',
                },
                {
                  title: 'In Your Car',
                  subtitle: 'No Alpha',
                  image:
                    'https://plus.unsplash.com/premium_photo-1672743593021-86baaab96274?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODUxNjEyOA&ixlib=rb-4.0.3&q=80&w=800',
                },
              ].map(({ title, subtitle, image }) => (
                <div
                  key={image}
                  className="flex flex-col h-60 bg-gray-500/10 rounded-md mx-4 my-2"
                >
                  <Image
                    src={image}
                    width={160}
                    height={160}
                    alt={title}
                    className="rounded-md h-40 w-40 mx-auto my-3"
                  />
                  <h3 className="ml-2.5 font-bold text-white">{title}</h3>
                  <h4 className="ml-2.5 text-white/40 ">{subtitle}</h4>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
