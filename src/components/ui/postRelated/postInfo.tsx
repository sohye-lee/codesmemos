'use client';
import { capitalize, dateFormat } from '@/lib/functions';
import { ExtendedPost } from '@/lib/types';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostInfoProps {
  post: ExtendedPost;
}

export default function PostInfo({ post }: PostInfoProps) {
  const { theme, setTheme } = useTheme();
  const [className, setClassName] = useState<string>();
  const [textColor, setTextColor] = useState<string>();

  useEffect(() => {
    theme == 'light'
      ? setClassName('bg-gray-800 text-white ')
      : setClassName('bg-gray-300 text-black');

    theme == 'light'
      ? setTextColor('text-gray-600')
      : setTextColor('text-gray-300');
  }, [theme, setClassName]);
  return (
    <div className="flex items-center flex-wrap gap-2  ">
      <div className="flex items-center gap-2">
        <Link
          href={`/?filter=${post.type}`}
          className={`px-2 py-[2px]  text-xs ${className}`}
        >
          {capitalize(post.type)}
        </Link>
        <Link
          href={`/languages/${post.languageName}`}
          className={`px-2 py-[2px]  text-xs  ${className}`}
        >
          {capitalize(post.languageName)}
        </Link>
      </div>
      <div className={`flex items-center gap-1 text-xs ${textColor} `}>
        <span>
          Posted by
          <Link href={`/users/${post.user.id}`} className="underline ml-1">
            {post.user.username || post.user.name}
          </Link>
        </span>
        <span className="mx-1">|</span>
        <span>Created at {dateFormat(post.createdAt)}</span>
      </div>
    </div>
  );
}
