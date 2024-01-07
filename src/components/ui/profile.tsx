'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-blue-600 bg-blue-200 overflow-hidden">
        {session?.user?.image ? (
          <>
            <Image
              src={session?.user?.image + ''}
              alt="avatar"
              width="40"
              height="40"
            />
          </>
        ) : (
          <p className="text-white text-lg uppercase">
            {session?.user?.name![0]}
          </p>
        )}
      </div>
      <span className="inline-block text-[10px] text-gray-700">
        {session?.user?.name}
      </span>
    </div>
  );
}
