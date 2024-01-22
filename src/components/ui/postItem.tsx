'use client';
import { ExtendedPost } from '@/lib/types';
import Link from 'next/link';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import useCreate from '@/lib/useCreate';
import { signIn } from '@/app/actions';

interface PostItemProps {
  post: ExtendedPost;
}
export default function PostItem({ post }: PostItemProps) {
  const { data: session } = useSession();
  const { data: savesData } = useSWR(`/api/saves/${post.id}`);
  const { data: mySaveData } = useSWR(
    `/api/saves/${post.id}/${session?.user?.id}`
  );
  const [saves, setSaves] = useState(0);
  const [mySave, setMySave] = useState(false);
  const [updateSave, {data:saveData, error:saveError, loading}] = useCreate(`/api/saves/${post?.id}`);

  const clickSave = () => {
    if (!session?.user) {
      signIn();
    }
    if (!mySave) {
      console.log(session?.user?.id)
      // updateSave(session?.user?.id);
    } else {
      fetch(`/api/saves/${post.id}/${session?.user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setMySave(true)
        }
      })
      
    }

  }
  useEffect(() => {
    if (savesData && savesData.saveCount) {
      setSaves(savesData.saveCount);
    }
    if (mySaveData && mySaveData.ok) {
      setMySave(true);
    }
  }, [mySaveData, savesData]);

  return (
    <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3">
      <div className="flex items-center">
        <h5 className="text-xs text-gray-500">
          Posted by
          <Link href={`/users/${post.user.id}`} className="underline ml-1">
            {post.user.name}
          </Link>
        </h5>
      </div>
      <h2 className="text-lg font-medium">{post.title}</h2>
      <div className="text-sm p-2 bg-gray-200">
        <pre className=" text-wrap">
          {post.content.length > 300
            ? post.content.slice(0, 300) + '...'
            : post.content}
        </pre>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs gap-1 cursor-pointer" onClick={clickSave}>
          {mySave ? <IconHeartFilled width={16} /> : <IconHeart width="16" />}
          {saves}
        </div>
      </div>
    </div>
  );
}
