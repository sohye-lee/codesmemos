"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";

interface ProfileProps {
  nameShow: boolean;
}
export default function Profile({ nameShow }: ProfileProps) {
  const { data: session } = useSession();
  const { data } = useSWR(`/api/users/${session?.user?.id}`);

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-10 h-10 border border-blue-600 bg-blue-200 overflow-hidden">
        {session?.user?.image ? (
          <>
            <Image
              src={session?.user?.image + ""}
              alt="avatar"
              width="48"
              height="48"
            />
          </>
        ) : (
          <p className="text-white text-lg uppercase">
            {session?.user?.name![0]}
          </p>
        )}
      </div>
      {nameShow && (
        <span className="inline-block text-[10px] text-gray-700">
          {data?.user?.username || session?.user?.name}
        </span>
      )}
    </div>
  );
}
