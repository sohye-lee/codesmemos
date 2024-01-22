'use client';
import { ExtendedPost } from '@/lib/types';
import Link from 'next/link';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface PostItemProps {
  post: ExtendedPost;
}
export default function PostItem({ post }: PostItemProps) {
  const { data: session } = useSession();
  
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
        <pre>
          {post.content.length > 300
            ? post.content.slice(0, 300) + '...'
            : post.content}
        </pre>
      </div>
      <div className="flex items-center">
        <IconHeart width="16" />
      </div>
    </div>
  );
}
