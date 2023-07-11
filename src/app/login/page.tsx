'use client';

import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

export default async function Page() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
        height={208}
        width={208}
        alt="Spotify Logo"
        className="w-52 mb-5"
      />
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <button
              className="bg-[#18D860] text-white p-5 rounded-full font-semibold"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
